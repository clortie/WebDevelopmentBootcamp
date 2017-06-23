var express = require("express");
var app = express();
var request = require("request");

app.listen(process.ENV.PORT, process.ENV.IP, function(){
    console.log("MOVIE APP HAS STARTED");
});
