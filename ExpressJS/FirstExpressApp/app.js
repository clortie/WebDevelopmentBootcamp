var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goobye!"
app.get("/bye", function(req, res){
    console.log("REQUEST TO /BYE");
    res.send("Goodbye!");
});
// "/dog" => "MEOW!!"
app.get("/dog", function(req, res){
    console.log("REQUEST TO /DOG");
    res.send("MEOW!!");
});



//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});