var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Blencowe", "Elliot", "Miles", "Lauren"];

app.get("/", function(req, res){
    res.render("home");
});

// "/friends"
app.get("/friends",function(req, res){
    res.render("friends", {friends:friends});
});

app.post("/addfriend",function(req, res){
    friends.push(req.body.newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});