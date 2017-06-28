var mongoose = require("mongoose");
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

module.exports = mongoose.model("User", userSchema);