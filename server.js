// jshint esversion=6

const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/bmi_index.html");
});

app.post("/", function(req, res) {
    var height = Number(req.body.height) / 100;  // Convert height to meters
    var weight = Number(req.body.weight);
    var result = weight / (height * height);

    var message = "<h2>Your BMI is " + result.toFixed(2) + ".</h2>";  // toFixed(2) to format the result to 2 decimal places
    
    if (result <= 18.5) {
        message += "<h1>You are categorised as UNDERWEIGHT.</h1>";
    } else if (result > 18.5 && result <= 24.9) {
        message += "<h1>You are categorised as HEALTHY.</h1>";
    } else if (result > 24.9 && result <= 29.9) {
        message += "<h1>You are categorised as OVERWEIGHT.</h1>";
    } else if (result > 29.9 && result <= 34.9) {
        message += "<h1>You are categorised as OBESE.</h1>";
    } else if (result > 35) {
        message += "<h1>You are categorised as EXTREMELY OBESE.</h1>";
    }

    res.send(message);
});

app.listen(2000, function() {
    console.log("Server is running on port 2000");
});
