var express = require("express");
var mongoose = require("mongoose");

// musimy mieć ścieżkę: c:\data\db
// musimy uruchomić serwer mongodb: mongod
// importujemy bazę z pliku: mongo bookAPI .\booksJson.js
// bookAPI to nazwa bazy, books to kolekcja
// mongo
// show dbs
// use bookAPI
// show collections
// db.books.find()

var db = mongoose.connect("mongodb://localhost/bookAPI");

// używamy modeli, dzięki którym mongoose będzie wiedział jak przetłumaczyć dane, które otrzyma z bazy
var Book = require("./models/bookModel");

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route("/Books")
    .get(function (req, res) {

        // dostajemy obiekt JSON (nie string JSON)
        var query = req.query;

        /* przed wysłaniem do bazy danych możemy sprawdzić istnienie elementu

            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }

        */

        // find zakłada istnienie zmiennej db - podłączenia do bazy danych
        // jako pierwszy parametr możemy podać obiekt JSON (nie string JSON), jako parametr wyszukiwania
        // zapytanie z urla idzie bezpośrednio do bazy danych
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });

    });

bookRouter.route("/Books/:bookId")
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        });

    });

app.use("/api", bookRouter);

app.get("/", function (req, res) {
    res.send("welcome to bookapi");
});

app.listen(port, function () {
    console.log("running on port " + port);
});
