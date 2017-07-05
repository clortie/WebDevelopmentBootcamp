var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    

mongoose.connect("mongodb://localhost/auth_demo_app", {useMongoClient: true});


var app = express();
app.set("view engine", "ejs");
app.use(require("express-session")({
   secret:"The dark is generous and it is patient and it always wins – but in the heart of its strength lies its weakness: one lone candle is enough to hold it back. Love is more than a candle. Love can ignite the stars.",
   resave:false,
   saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret",function(req,res){
   res.render("secret"); 
});


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server started...");
});
    