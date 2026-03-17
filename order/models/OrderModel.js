const db = require("../../db");

const saveOrder = async (data) => {
    if (!data.id_client || !data.montant_paiement) {
        throw new Error("Données manquantes : id_client ou montant_paiement");
    }

    const sql = `INSERT INTO commandes
                 (ID_Client, montant_paiement, prix_ttc, mode_commande, statut_commande, mode_paiement, date_commande)
                 VALUES (?, ?, ?, ?, ?, ?, NOW())`;

    const [result] = await db.query(sql, [
        data.id_client,
        data.montant_paiement,
        data.montant_paiement,
        data.mode_commande,
        data.statut_commande,
        data.mode_paiement
    ]);
    return result;
};

const saveOrderDetails = async (id_commande, articles) => {
    if (!id_commande || !articles || articles.length === 0) {
        throw new Error("ID commande ou articles manquants");
    }

    const sql = `INSERT INTO details_commande
                 (ID_Commande, ID_Article, quantite, prix_unitaire)
                 VALUES ?`;

    const values = articles.map(article => [
        id_commande,
        article.id_article,
        article.quantite,
        article.prix_unitaire
    ]);

    const [result] = await db.query(sql, [values]);
    return result;
};

const updateProductStock = async (id, qty) => {
    if (!id || qty === undefined) {
        throw new Error("Paramètres manquants : id ou qty");
    }

    const [rows] = await db.query("SELECT stock FROM articles WHERE ID_Article = ?", [id]);

    if (rows.length === 0) {
        throw new Error(`Article avec l'ID ${id} introuvable`);
    }

    if (rows[0].stock < qty) {
        throw new Error(`Stock insuffisant pour l'article ${id}. Disponible: ${rows[0].stock}, Demandé: ${qty}`);
    }

    const [result] = await db.query("UPDATE articles SET stock = stock - ? WHERE ID_Article = ?", [qty, id]);

    if (result.affectedRows === 0) {
        throw new Error(`Aucune ligne mise à jour pour l'article ${id}`);
    }

    return result;
};

module.exports = { saveOrder, saveOrderDetails, updateProductStock };