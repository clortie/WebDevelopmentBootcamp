/*------------------------------*/
/*-------- Requirements --------*/
/*------------------------------*/
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

/*------------------------------*/
/*------ Mongoose Config -------*/
/*------------------------------*/

//connect mongoose to db  
mongoose.connect("mongodb://localhost/blog_app");
// verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected to db");
});

//schema setup
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type: Date, default: Date.now}
});

//DB model
var Blog = mongoose.model("Blog",blogSchema);
// create a blog
// Blog.create(
//     {
//         title:"Test Blog",
//         image:"https://cdn.pixabay.com/photo/2015/09/24/20/36/beer-barrel-956322_960_720.jpg",
//         body:"Sizzle metus own yo', luctizzle et, things et, boom shackalack izzle, nulla. Donizzle pharetra, nisi check it out check it out my shizz, neque shut the shizzle up cool velizzle, mollis fringilla libero fo shizzle ac fizzle. Dizzle aptent taciti gangsta izzle litora torquent bow wow wow conubia dawg, pizzle inceptos yo mamma. Aliquam maurizzle brizzle, scelerisque black, iaculis vel, accumsizzle break yo neck, yall, bow wow wow. Crazy lacizzle. Gangster velit break it down, accumsan eu, phat my shizz, molestie ac, sapizzle. Curabitizzle condimentizzle. Aenizzle nizzle fo nizzle things gangsta pharetra. Integizzle you son of a bizzle felizzle, shut the shizzle up id, elementum quizzle, mollis nizzle, ligula. Maecenas izzle pede. Phat nibh. Nulla enizzle. Nulla blandizzle. Fizzle metizzle magna, sempizzle sheezy, lobortis its fo rizzle, mah nizzle for sure, bizzle. Morbi doggy get down get down, yo mamma shizzlin dizzle, dapibizzle eu, pretium pimpin', velizzle. Shiznit dictizzle tellizzle quizzle for sure tempus aliquizzle."
        
//     });

/*------------------------------*/
/*--------- App Config ---------*/
/*------------------------------*/

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

/*--------------------------------*/
/*-------- RESTful Routes --------*/
/*--------------------------------*/

//ROOT
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req, res){
   res.render("new"); 
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
   //create blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           //try again
           res.render("new");
       }else{
           //redirect to the index
           res.redirect("/blogs");
       }
   });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog}); 
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/"+req.params.id);
       }
   });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
   //destroy blog
  Blog.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/blogs");
      }else{
          res.redirect("/blogs");
      }
  });
});



/*------------------------------*/
/*---------Start Server---------*/
/*------------------------------*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});