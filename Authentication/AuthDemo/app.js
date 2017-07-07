var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
// ======================
// MONGOOSE CONFIG
// ======================

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/auth_demo_app", {useMongoClient: true});


// ======================
// APP CONFIG
// ======================

var app = express();
app.set("view engine", "ejs");
app.use(require("express-session")({
   secret:"The dark is generous and it is patient and it always wins – but in the heart of its strength lies its weakness: one lone candle is enough to hold it back. Love is more than a candle. Love can ignite the stars.",
   resave:false,
   saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));


// ======================
// PASSPORT
// ======================

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// ROUTES
// ======================

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret",isLoggedIn,function(req,res){
   res.render("secret"); 
});

//AUTH ROUTES

//show signup form
app.get("/register",function(req,res){
    res.render("register");
});

//handle user sign up
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }else{
            passport.authenticate("local")(req,res,function(){
               res.redirect("/secret"); 
            });
        }
    });
});

//LOGIN ROUTES

app.get("/login",function(req,res){
   res.render("login"); 
});

//login through middleware
app.post("/login",passport.authenticate("local",{
        successRedirect:"/secret",
        failureRedirect:"/login",
    }),function(req,res){
    //Nothing needed for now
});

//LOGOUT ROUTES

app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");
   
});

// ======================
// FUNCTIONS
// ======================

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// ======================
// START SERVER
// ======================

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server started...");
});
    