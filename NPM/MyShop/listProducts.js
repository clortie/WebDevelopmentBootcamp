var faker = require("faker");

//display welcome
console.log("Welcome to "+faker.company.companyName()+"!\n\""+faker.company.catchPhrase()+"\"");
console.log("We offer the following products:");

//print out 10 random product names and prices
for(var i=0;i<10;i++){
    console.log(faker.commerce.productName()+ ": $"+faker.commerce.price());
}