const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "//index.html");
});

app.get("/guestbook", function (req, res) {
  var json = require("./data.json");
  var results = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <title>Message AJAX Form</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="./">Super Villain fanpage</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="./guestbook">Guestbook</a></li>
        <li><a href="./form.html">New Message</a></li>
        <li><a href="./ajaxform.html">Ajax Message</a></li>
      </ul>
    </div>
  </nav>
  
  <table class="table">
  <thead>
      <tr>
        <th>Username</th>
        <th>Country</th>
        <th>Message</th>
      </tr>
    </thead>`;
  for (var i = 0; i < json.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      json[i].username +
      "</td>" +
      "<td>" +
      json[i].country +
      "</td>" +
      "<td>" +
      json[i].message +
      "</td>" +
      `</tr>
      
      </body>
</html>
      `;
  }
  res.send(results);
});

app.post("/newmessage", function (req, res) {
  //res.sendFile(__dirname + "//form.html");

  //siirretään bodyparserilla napatut lomake inputit muuttujiin
  var new_name = req.body.username;
  var new_country = req.body.country;
  var new_message = req.body.message;

  //haetaan data.jsonin tiedot muuttujaan data
  var data = require("./data.json");

  //esitellään muuttuja, johon tallenetaan lomakeinputiin syötetyt tiedot
  let newData = {
    id: data.length + 1,
    username: new_name,
    country: new_country,
    message: new_message,
  };

  //lisätään uudet tiedot json tiedostoon
  data.push(newData);

  res.send("Message sent!");
});

app.post("/ajaxmessage", function (req, res) {
  var username = req.body.username;
  var country = req.body.country;
  var message = req.body.message;
  //console.log("backend: " + message);
  res.send(
    "username: " +
      username +
      "<br> country: " +
      country +
      "<br> message: " +
      message +
      "<br>" +
      "<br>"
  );
});

app.get("*", function (req, res) {
  res.send("Can't find the requested page", 404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
