//print all numbers between -10 and 19
var num = -10;
for(;num<20;num++){
	console.log(num);
}

//all even numbers between 10 and 40
for(num=10;num<41;num++){
	if(num%2===0){
		console.log(num);
	}
}

//all odds between 300 and 333
for(num=300;num<334;num++){
	if(num%2!==0){
		console.log(num);
	}
}

//all numbers divisible by 5 and 3 between 5 and 50
for(num=5;num<51;num++){
	if(num%3===0&&num%5===0){
		console.log(num);
	}
}
