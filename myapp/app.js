const express = require("express")
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Création du serveur Express
const app = express();

// Configuration du serveur
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de donnée SQlite
const db_name = path.join(__dirname, "vehicle.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'vehicule.db'");
});

// Démarrage du serveur
app.listen(3000, function () {
    console.log("Cliquez sur http://localhost:3000/")
})

app.get('/', function (req, res, next) {
    res.render("app");
})

app.get("/about", function (req, res, next) {
    res.render("about")
})

app.get("/vehicule", function (req, res, next) {
    const sql = "SELECT * from vehicule"
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message)
        }
        res.render("vehicule", { vehicules: rows })
    })
})

app.get("/edit/:id", (req, res, next) => {
    const id = req.params.id
    const sql = "SELECT * from vehicule where id__b= ?"
    db.get(sql, [id], (err, rows) => {
        if (err) {
            return console.error(err.message)
        }
        res.render("edit", { vehicules: rows })
    })
})

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const vehicule = [req.body.Marque, req.body.Modele, req.body.Plaque, id];
    const sql = "UPDATE vehicule SET marque__b = ?, modele__b = ?, plaque__b = ? WHERE (id__b = ?)";
    db.run(sql, vehicule, err => {
        if (err) {
            return console.error(err.message)
        }
        res.redirect("/vehicule");
    });
});

app.get("/create", (req, res) => {
    res.render("create", { vehicules: {} })
})

app.post("/create", (req, res) => {
    const sql = "INSERT INTO vehicule (marque__b, modele__b, plaque__b) VALUES (?, ?, ?)";
    const vehicule = [req.body.Marque, req.body.Modele, req.body.Plaque];
    db.run(sql, vehicule, err => {
        if (err) {
            return console.error(err.message)
        }
        res.redirect("/vehicule");
    })

})

app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM vehicule WHERE id__b = ?";
    db.run(sql, [id], err => {
        if (err) {
            return console.error(err.message)
        }
        res.redirect("/vehicule");
    });
});
