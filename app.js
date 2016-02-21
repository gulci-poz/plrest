var express = require("express");
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://localhost/bookAPI");

// uzywamy modeli, dzięki którym mongoose będzie wiedział jak przetłumaczyć dane, które otrzyma z bazy
var Book = require("./models/bookModel");

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();
// 2:40 + baza

bookRouter.route("/Books")
    .get(function (req, res) {
        var responseJson = { firstname: "Harper", lastname: "Lee" };
        res.json(responseJson);
    });

app.use("/api", bookRouter);

app.get("/", function (req, res) {
    res.send("welcome to bookapi");
});

app.listen(port, function () {
    console.log("running on port " + port);
});
