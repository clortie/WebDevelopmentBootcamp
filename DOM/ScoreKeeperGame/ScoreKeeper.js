//get player buttons
var player1 = document.getElementById("p1");
var player2 = document.getElementById("p2");

//get player display spans
var p1Display = document.getElementById("p1Display");
var p2Display = document.getElementById("p2Display");

//get reset button
var resetButton = document.getElementById("reset");

//get max score input
var numInput = document.querySelector("input");

//get max score display span
var maxScoreDisplay = document.getElementById("maxScoreDisplay");

//intitialize score values
var p1Score = 0;
var p2Score = 0;
var maxScore = 5;

//boolean for game state
var gameOver = false;

//event listeners for player buttons
player1.addEventListener("click", function(){
	if(!gameOver){
		p1Score++;
		p1Display.innerHTML = p1Score;
	}
	if(p1Score === maxScore){
		gameOver = true;
		p1Display.classList.add("winner");
	}
});

//event listeners for player buttons
player2.addEventListener("click", function(){
	if(!gameOver){
		p2Score++;
		p2Display.innerHTML = p2Score;
	}
	if(p2Score === maxScore){
		gameOver = true;
		p2Display.classList.add("winner");
	}
});

//listener for reset button
resetButton.addEventListener("click", reset);

//listener for numInput
numInput.addEventListener("change",function(){
	document.getElementById("maxScoreDisplay").innerHTML = numInput.value;
	maxScore = Number(numInput.value);
	reset();
});

function reset(){
	gameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Display.innerHTML = p1Score;
	p2Display.innerHTML = p2Score;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	maxScoreDisplay.innerHTML = maxScore;

};
