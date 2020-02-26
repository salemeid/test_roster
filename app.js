//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test_rosrer",
  insecureAuth: true
});

app.get("/",function(req,res){
  res.render("roster");
});


app.get("/shift",function(req,res){
  res.render("shift");
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});
var obj = {};
var sql = 'SELECT * FROM roster1 WHERE PRN = ? AND MONTHNAME(Date) = ? AND YEAR(Date) = ? ORDER BY Date';
app.post('/', function(req, res){
  var newYear = req.body.year
  var newMonth = req.body.month
  var newPRN = req.body.PRN
  con.query(sql,[newPRN, newMonth, newYear], function (err, result) {
    if (err) throw err;
    obj = {ros : result, newPRN : newPRN};
    res.render('display',obj);
  });

});


app.listen(3000, function() {
  console.log("server started listening on port 3000");
});
