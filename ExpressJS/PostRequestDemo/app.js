var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

// "/friends"
app.get("/friends",function(req, res){
    var friends = ["Blencowe", "Elliot", "Miles", "Lauren"];
    res.render("friends", {friends:friends});
});

app.post("/addfriend",function(req, res){
    res.send("you have reached the post route");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});