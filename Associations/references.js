var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

//get Post model
var Post = require("./models/post");

//get User model
var User = require("./models/user");


// User.create({
//     email:"bob@bob.com",
//     name:"Bob Belcher"
// });

//create post
Post.create({
    title:"How to cook the best burger pt. 4",
    content:"Do whatever you want and then eat it twice AND THEN ONE MORE TIMEE!!! and then be sure to poop it out"
}, function(err,post){
    if(err){
        console.log(err);
    }else{
        //find user
      User.findOne({email:"bob@bob.com"},function(err, foundUser){
          if(err){
              console.log(err);
          }else{
              //push post into user
              foundUser.posts.push(post);
              //save user
              foundUser.save(function(err,data){
                  if(err){
                      console.log(err);
                  }else{
                      console.log(data);
                  }
              });
          }
      });
    }
});

//Find user
// User.findOne({email:"bob@bob.com"}).populate("posts").exec(function(err,user){
//   if(err){
//       console.log(err);
       
//   } else{
//       console.log(user);
//   }
// });
