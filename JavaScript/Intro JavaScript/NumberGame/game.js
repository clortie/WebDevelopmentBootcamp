//create secret number
var secretNumber = 4;

//ask user for guess
var guess = Number(prompt("Guess a number:"));

//check guess
if(guess===secretNumber){
	alert("You got it right!");
}
//otherwise, check for higher or lower
else if(guess<secretNumber){
	alert("Too low. Try again.");
}
else{
	alert("Too high. Try again.");
}
