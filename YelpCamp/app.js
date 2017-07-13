// ===================================
// REQUIREMENTS
// ===================================

var express            = require("express"),
    app                = express(),
    bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    methodOverride     = require("method-override"),
    flash              = require("connect-flash"),
    moment             = require("moment"),
    seedDB             = require("./seeds"),
    passport           = require("passport"),
    LocalStrategy      = require("passport-local"),
    User               = require("./models/user");



// ===================================
// ROUTES
// ===================================

var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");



// ===================================
// MONGOOSE
// ===================================

//connect mongoose to db
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
//seed db
seedDB();
// verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected to db");
});



// ===================================
// APP & PASSPORT CONFIG
// ===================================

//body parser
app.use(bodyParser.urlencoded({extended: true}));
//use ejs
app.set("view engine", "ejs");
//use public folder
app.use(express.static(__dirname+"/public"));
//set secret
app.use(require("express-session")({
    secret: "As I walk through the valley where I harvest my grain, I take a look at my wife and realize she's very plain, but that's just perfect for an Amish like me. You know, I shun fancy things like electricity",
    resave:false,
    saveUninitialized:false
}));
//connect flash
app.use(flash());
//moment
app.locals.moment = moment;
//set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
//add needed vars to routes as middleware
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.messages = 
        [   
            req.flash("error"),
            req.flash("success"),
            req.flash("info")
        ];
    res.locals.messageClasses = 
        [
            "danger",
            "success",
            "info"
        ];
    next();
});
//method override
app.use(methodOverride("_method"));
//use route files
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



// ===================================
// START SERVER
// ===================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});

