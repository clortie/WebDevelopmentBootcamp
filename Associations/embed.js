var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


//POST - title, content
var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post", postSchema);


//USER - email, name
var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email:"calvin@best.com",
//     name:"Calvin DerBester"
// });
// newUser.posts.push({
//     title:"How to be successful",
//     content:"Work harder than everyone else."
// });
// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });
// var newPost = new Post({
//     title:"What is the best hard cider?",
//     content:"I love drinking hard cider. I'm always dtf with a new hard cider. What is the best hard cider out there?"
// });
// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

User.findOne({name:"Calvin DerBester"}, function(err,user){
    if(err){
        console.log(err);
    }else{
        user.posts.push({
            title:"3 Things I Really Hate",
            content:"Nothing. Do not hate. It's a waste of your time and energy."
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});