var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");


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
    posts:[
        {
            //array of object id's belonging to posts
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

// User.create({
//     email:"bob@bob.com",
//     name:"Bob Belcher"
// });

//create post
// Post.create({
//     title:"How to cook the best burger pt. 3",
//     content:"Do whatever you want and then eat it twice AND THEN ONE MORE TIMEE!!!"
// }, function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         //find user
//       User.findOne({email:"bob@bob.com"},function(err, foundUser){
//           if(err){
//               console.log(err);
//           }else{
//               //push post into user
//               foundUser.posts.push(post);
//               //save user
//               foundUser.save(function(err,data){
//                   if(err){
//                       console.log(err);
//                   }else{
//                       console.log(data);
//                   }
//               });
//           }
//       });
//     }
// });

//Find user
User.findOne({email:"bob@bob.com"}).populate("posts").exec(function(err,user){
   if(err){
       console.log(err);
       
   } else{
       console.log(user);
   }
});
