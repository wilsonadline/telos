const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "hubspots_user",
    password: "MHn9.W7/2^fq",
    database:"hubspots" 
});

db.connect((err) => {
    if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
    }
    console.log('Connecté à la base de données MySQL');
});

module.exports = db;