var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
            name:"Regular Campground",
            image:"https://www.nps.gov/lavo/planyourvisit/images/Lost-Creek-Campground.jpg",
            description:"Come visit our regular campground! Nothing strange happens here..."
    },
    {
            name:"Snowy Camper",
            image:"http://adventurejay.com/blog/images/IMG_1214.JPG",
            description:"Come stay in our snowy camper! Marvel as the local wolf pack attemps to break in and feast on your tender flesh."
    },
    {
            name:"Desert Sufferage",
            image:"http://maxpixel.freegreatpicture.com/static/photo/1x/Red-Rocks-Rugged-Goblin-Desert-Campground-Utah-780108.jpg",
            description:"Love sleeping in blistering heat? Do you enjoy being eaten to death by mosquitos? Come experience the utter frustration of our mosquito netting failing to do it's only function."
    },
    {
            name:"Underwater Tomb",
            image:"https://c1.staticflickr.com/9/8704/16594805374_059d08b840_b.jpg",
            description:"THIS IS NOT A CAMPGROUND!!! This is an underwater resort, but it is much better than a campground. Zero bugs, zero dry air, zero oxygen...it'll take your breath away."
    }
]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
         console.log(err);
        }
        else{
            console.log("removed campgrounds!");
        }
        //add new campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added campground");
                    //create comment
                    Comment.create(
                        {
                            text:"This place is gr8!",
                            author:"Paul"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            }); 
        });
    });
}

module.exports = seedDB;
