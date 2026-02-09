const { saveOrder, saveOrderDetails, updateProductStock } = require("../models/OrderModel");

const createOrder = async (req, res) => {
    try {
        const { id_client, articles, total_ttc, mode_commande, mode_paiement } = req.body;

        // Validation des données
        if (!id_client || !articles || articles.length === 0 || !total_ttc) {
            return res.status(400).json({
                message: "Données manquantes : id_client, articles ou total_ttc requis"
            });
        }

        console.log("Création de commande pour client:", id_client);
        console.log("Articles:", articles);

        // ÉTAPE 1 : Créer la commande principale
        const orderData = {
            id_client,
            montant_paiement: total_ttc,  // Attention : montant_paiement, pas prix_ttc !
            mode_commande: mode_commande || 'en_ligne',
            statut_commande: 'en_attente',
            mode_paiement: mode_paiement || 'cb'
        };

        const result = await saveOrder(orderData);
        const orderId = result.insertId;

        console.log(`Commande créée avec ID: ${orderId}`);

        // ÉTAPE 2 : Enregistrer les détails de la commande (articles)
        await saveOrderDetails(orderId, articles);

        console.log(`Détails de commande enregistrés`);

        // ÉTAPE 3 : Mettre à jour les stocks
        await Promise.all(articles.map(async (item) => {
            return await updateProductStock(item.id_article, item.quantite);
        }));

        console.log(`Stocks mis à jour avec succès`);

        // Réponse de succès
        res.status(201).json({
            success: true,
            message: "Commande validée avec succès",
            orderId: orderId,
            nb_articles: articles.length
        });

    } catch (error) {
        console.error("Erreur lors de la création de commande:", error.message);

        // Gestion d'erreurs spécifiques
        if (error.message.includes("Stock insuffisant")) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la validation de la commande",
            error: error.message
        });
    }
};

module.exports = { createOrder };