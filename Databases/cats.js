var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

// pattern for cats
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// model for cats in db
var Cat = mongoose.model("Cat", catSchema);

//add a new cat to the DB
// var fred = new Cat({
//     name:"Mrs. Norris",
//     age:8,
//     temperament:"Evil"
// });

// fred.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     }
//     else{
//         console.log("We just saved a cat to the DB:");
//         console.log(cat);
//     }
// });

Cat.create({
    name:"Snowy",
    age:15,
    temperament:"Bland"
},function(err,cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one

// Cat.find({}, function(err, cats){
//     if(err){
//         console.log("ERROR:");
//         console.log(err);
//     }
//     else{
//         console.log("All the cats:");
//         console.log(cats);
//     }
// });