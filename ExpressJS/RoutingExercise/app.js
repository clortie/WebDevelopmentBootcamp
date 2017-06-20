var express = require("express");
var app = express();


/** 
*********
ROUTES **
*********
**/

// "/" route
app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});

// "/speak/:animal" route
app.get("/speak/:animalName/", function(req,res){
    var animalName = req.params.animalName;
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof! Woof!"
    };
    if(sounds[animalName]){
        res.send("The "+animalName+" says '"+sounds[animalName]+"'");
    }
    else{
        res.send("Try /dog /cow or /pig");
    }
    
});

// "/repeat/:repeatedPhrase/:numTimes/"
app.get("/repeat/:repeatedPhrase/:numTimes/",function(req,res){
    var phrase = req.params.repeatedPhrase;
    var numTimes = req.params.numTimes;
    var stringToSend = "";
    for(var i = 0;i<numTimes;i++){
        stringToSend+=phrase+" ";
    }
    res.send(stringToSend);
});

// catch all
app.get("*",function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});