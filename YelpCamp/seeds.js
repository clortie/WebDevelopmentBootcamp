var mongoose = require("mongoose");
var geocoder = require("geocoder");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");


var Neo = new User({
    username:"Neo",
    password:"bootybooty"
});
var Paul = new User({
    username:"Paul",
    password:"paulpaulbootybooty"
});

var data = [
    {
            name:"Regular Campground",
            price:"12",
            image:"https://www.nps.gov/lavo/planyourvisit/images/Lost-Creek-Campground.jpg",
            description:"Come visit our regular campground! Nothing strange happens here...",
            author:{id:Neo, username:"Neo"},
            location:"Yosemite National Park, California, USA"
    },
    {
            name:"Snowy Camper",
            price:"6.66",
            image:"http://adventurejay.com/blog/images/IMG_1214.JPG",
            description:"Come stay in our snowy camper! Marvel as the local wolf pack attemps to break in and feast on your tender flesh.",
            author:{id:Neo, username:"Neo"},
            location:"Yosemite National Park, California, USA"
    },
    {
            name:"Desert Sufferage",
            price:"15",
            image:"http://maxpixel.freegreatpicture.com/static/photo/1x/Red-Rocks-Rugged-Goblin-Desert-Campground-Utah-780108.jpg",
            description:"Love sleeping in blistering heat? Do you enjoy being eaten to death by mosquitos? Come experience the utter frustration of our mosquito netting failing to do it's only function.",
            author:{id:Neo, username:"Neo"},
            location:"Yosemite National Park, California, USA"
    },
    {
            name:"Underwater Tomb",
            price:"666",
            image:"https://c1.staticflickr.com/9/8704/16594805374_059d08b840_b.jpg",
            description:"THIS IS NOT A CAMPGROUND!!! This is an underwater resort, but it is much better than a campground. Zero bugs, zero dry air, zero oxygen...it'll take your breath away.",
            author:{id:Neo, username:"Neo"},
            location:"Yosemite National Park, California, USA"
    }
];

function seedDB(){
    Comment.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed comments");
        Campground.remove({},function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("removed campgrounds!");
            }
            //add new campgrounds
            data.forEach(function(seed){
                geocoder.geocode(seed.location,function(err,data){
                    if(err){console.log(err);}
                    else{
                        var lat = data.results[0].geometry.location.lat;
                        var lng = data.results[0].geometry.location.lng;
                        var location = data.results[0].formatted_address;
                        Campground.create({name:seed.name,price:seed.price,description:seed.description,author:seed.author,image:seed.image,lat:lat,lng:lng,location:location},function(err,campground){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("added campground");
                                //create comment
                                Comment.create(
                                {
                                    text:"This place is gr8!",
                                    author:{id:Paul,username:"Paul"}
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
                    }
                });
            });
        });
    });
}

module.exports = seedDB;
