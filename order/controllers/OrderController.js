const { saveOrder, saveOrderDetails, updateProductStock } = require("../models/OrderModel");

const createOrder = async (req, res) => {
    let connection;

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


        const db = require("../config/db");
        connection = await db.promise().getConnection();


        await connection.beginTransaction();


        const orderData = {
            id_client,
            montant_paiement: total_ttc,
            mode_commande: mode_commande || 'en_ligne',
            statut_commande: 'en_attente',
            mode_paiement: mode_paiement || 'cb'
        };


        const result = await saveOrder(orderData, connection);
        const orderId = result.insertId;
        console.log(`Commande créée avec ID: ${orderId}`);


        await saveOrderDetails(orderId, articles, connection);
        console.log(`Détails de commande enregistrés`);


        await Promise.all(articles.map(item =>
            updateProductStock(item.id_article, item.quantite, connection)
        ));
        console.log(`Stocks mis à jour avec succès`);


        await connection.commit();


        res.status(201).json({
            success: true,
            message: "Commande validée avec succès",
            orderId: orderId,
            nb_articles: articles.length
        });

    } catch (error) {

        if (connection) {
            await connection.rollback();
            console.log("Transaction annulée suite à une erreur");
        }

        console.error("Erreur lors de la création de commande:", error.message);


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
    } finally {

        if (connection) {
            connection.release();
        }
    }
};

module.exports = { createOrder };