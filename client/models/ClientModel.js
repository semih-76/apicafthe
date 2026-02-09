// Mode Client

const db = require("../../db");
const bcrypt = require("bcryptjs");

//Rechercher un client par email
const findClientByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM clients WHERE email_client = ?",
        [email],
    );
    return rows;
};

// Créer un nouveau client
const createClient = async (clientData) => {
    const {
        nom,
        prenom,
        email,
        mot_de_passe,
        adresse_facturation,
        ville_facturation,
        cp_facturation,
        adresse_livraison,
        cp_livraison,
        ville_livraison,
        telephone,
    } = clientData;

    const [result] = await db.query(
        `INSERT INTO clients
    (nom_client, prenom_client,email_client, mdp_client,adresse_facturation, cp_facturation,
   ville_facturation, adresse_livraison, cp_livraison, ville_livraison
    ,telephone_client )
    VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nom,
            prenom,
            email,
            mot_de_passe,
            adresse_facturation || null,
            ville_facturation || null,
            cp_facturation || null,
            adresse_livraison || null,
            cp_livraison || null,
            ville_livraison || null,
            telephone || null,
        ],
    );
    return result;
};

//Hacher un mdp
const hashPassword = async (password) => {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
    return await bcrypt.hash(password, rounds);
    //ou en entier => return await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 10);
};

// Comparer un mot de passe
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    findClientByEmail,
    createClient,
    hashPassword,
    comparePassword,
};
