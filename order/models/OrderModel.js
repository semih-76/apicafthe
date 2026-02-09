const db = require("../config/db");

const saveOrder = (data) => {
    return new Promise((resolve, reject) => {

        if (!data.id_client || !data.prix_ttc) {
            return reject(new Error("Données manquantes : id_client ou prix_ttc"));
        }

        console.log("Données reçues pour saveOrder :", data);


        const sql = "INSERT INTO commandes (ID_Client, montant_paiement, date_commande) VALUES (?, ?, NOW())";

        db.query(sql, [data.id_client, data.prix_ttc], (err, res) => {
            if (err) {
                console.error("Erreur SQL lors de saveOrder :", err.message);
                return reject(err);
            }
            resolve(res);
        });
    });
};


const updateProductStock = (id, qty) => {
    return new Promise((resolve, reject) => {

        if (!id || qty === undefined) {
            return reject(new Error("Paramètres manquants : id ou qty"));
        }

        console.log(`Mise à jour stock - ID: ${id}, Quantité: ${qty}`);


        const checkSql = "SELECT stock FROM articles WHERE ID_Article = ?";

        db.query(checkSql, [id], (err, results) => {
            if (err) {
                console.error(`Erreur lors de la vérification du stock pour l'ID ${id} :`, err.message);
                return reject(err);
            }

            if (results.length === 0) {
                return reject(new Error(`Article avec l'ID ${id} introuvable`));
            }

            if (results[0].stock < qty) {
                return reject(new Error(`Stock insuffisant pour l'article ${id}. Disponible: ${results[0].stock}, Demandé: ${qty}`));
            }

            // Mise à jour du stock
            const updateSql = "UPDATE articles SET stock = stock - ? WHERE ID_Article = ?";

            db.query(updateSql, [qty, id], (err, res) => {
                if (err) {
                    console.error(`Erreur SQL lors de la mise à jour du stock pour l'ID ${id} :`, err.message);
                    return reject(err);
                }

                if (res.affectedRows === 0) {
                    return reject(new Error(`Aucune ligne mise à jour pour l'article ${id}`));
                }

                console.log(`Stock mis à jour avec succès pour l'article ${id}`);
                resolve(res);
            });
        });
    });
};

const saveOrderDetails = (id_commande, articles) => {
    return new Promise((resolve, reject) => {
        if (!id_commande || !articles || articles.length === 0) {
            return reject(new Error("ID commande ou articles manquants"));
        }

        const sql = `INSERT INTO details_commande 
                     (ID_Commande, ID_Article, quantite, prix_unitaire) 
                     VALUES ?`;

        // Préparer les valeurs pour l'insertion multiple
        const values = articles.map(article => [
            id_commande,
            article.id_article,
            article.quantite,
            article.prix_unitaire
        ]);

        db.query(sql, [values], (err, res) => {
            if (err) {
                console.error("Erreur lors de l'enregistrement des détails :", err.message);
                return reject(err);
            }
            console.log(`${res.affectedRows} articles enregistrés pour la commande ${id_commande}`);
            resolve(res);
        });
    });
};

module.exports = {
    saveOrder,
    updateProductStock,
    saveOrderDetails
};