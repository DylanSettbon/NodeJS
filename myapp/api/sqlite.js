const path = require('path');
const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de donnée SQlite
const db_name = path.join(__dirname, "../vehicle.db");
console.log(db_name);
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'vehicule.db'");
});

module.exports = db;