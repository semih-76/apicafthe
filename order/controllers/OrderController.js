const db = require("../../db");
const { saveOrder, saveOrderDetails, updateProductStock } = require("../models/OrderModel");

const createOrder = async (req, res) => {
    try {
        const { id_client, articles, total_ttc, mode_commande, mode_paiement } = req.body;

        if (!id_client || !articles || articles.length === 0 || !total_ttc) {
            return res.status(400).json({
                success: false,
                message: "Données manquantes : id_client, articles ou total_ttc requis"
            });
        }

        for (const article of articles) {
            if (!article.quantite || article.quantite <= 0) {
                return res.status(400).json({
                    success: false,
                    message: `Quantité invalide pour l'article ${article.id_article}`
                });
            }
        }

        console.log("Création de commande pour client:", id_client);
        console.log("Articles:", articles);

        const orderData = {
            id_client,
            montant_paiement: total_ttc,
            mode_commande: mode_commande || 'en_ligne',
            statut_commande: 'en_attente',
            mode_paiement: mode_paiement || 'cb'
        };

        const result = await saveOrder(orderData);
        const orderId = result.insertId;
        console.log(`Commande créée avec ID: ${orderId}`);

        await saveOrderDetails(orderId, articles);
        console.log("Détails de commande enregistrés");

        await Promise.all(articles.map(item =>
            updateProductStock(item.id_article, item.quantite)
        ));
        console.log("Stocks mis à jour");

        res.status(201).json({
            success: true,
            message: "Commande validée avec succès",
            orderId,
            nb_articles: articles.length
        });

    } catch (error) {
        console.error("ERREUR COMPLÈTE:", error);

        if (error.message.includes("Stock insuffisant")) {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la validation de la commande",
            error: error.message
        });
    }
};

const getClientOrders = async (req, res) => {
    try {
        const id_client = req.client.id;

        const [commandes] = await db.query(
            `SELECT c.ID_Commande, c.date_commande, c.statut_commande, c.prix_ttc, c.mode_commande, c.mode_paiement,
                    COUNT(d.ID_Article) as nb_articles
             FROM commandes c
             LEFT JOIN details_commande d ON c.ID_Commande = d.ID_Commande
             WHERE c.ID_Client = ?
             GROUP BY c.ID_Commande
             ORDER BY c.date_commande DESC`,
            [id_client]
        );

        const formatted = commandes.map(c => ({
            id: `CMD-${c.ID_Commande}`,
            date: c.date_commande ? new Date(c.date_commande).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A',
            statut: c.statut_commande || 'En attente',
            prix: parseFloat(c.prix_ttc) || 0,
            articles: c.nb_articles || 0,
            mode: c.mode_commande,
            paiement: c.mode_paiement
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Erreur récupération commandes:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
};

module.exports = { createOrder, getClientOrders };