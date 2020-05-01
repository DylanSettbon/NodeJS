var db = require('../sqlite');

var Vehicle = {
    getall: function (callback) {
        return db.all('SELECT * from vehicule', callback);
    },
    get: function (id, callback) {
        return db.get("SELECT * FROM vehicule where id__b = ?", [id], callback);
    },
    deleted: function (id, callback) {
        return db.run("DELETE FROM vehicule WHERE id__b = ?", [id], callback);
    },
    updated: function (Vehicle, callback) {
        return db.run("UPDATE vehicule set marque__b = COALESCE(?, marque__b), modele__b = COALESCE(?, modele__b), plaque__b = COALESCE(?, plaque__b) WHERE id__b = ?", [Vehicle.marque__b, Vehicle.modele__b, Vehicle.plaque__b, Vehicle.id__b], callback);
    },
    add: function (Vehicle, callback) {
        return db.run("INSERT INTO vehicule (marque__b, modele__b, plaque__b) VALUES (?, ?, ?)", [Vehicle.marque, Vehicle.modele,Vehicle.plaque], callback);
    }
}

module.exports = Vehicle;

