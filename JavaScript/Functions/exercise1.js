function isEven(num){
	if(typeof num !== "number"){
		return "Please pass a number.";
	}else{
		return num%2===0
	}
}

function factorial(num){
	if(typeof num !== "number"){
		return "Please pass a number.";
	}else{
		result=1;
		for(;num>1;num--){
			result*=num;
		}
		return result;
	}
}

function kebabToSnake(str){
	if(typeof str !== "string"){
		return "Please pass a string";
	}
	else{
		var snake = "";
		for(i=0;i<str.length;i++){
			if(str[i]=="-"){
				snake+="_";
			}
			else{
				snake+=str[i];
			}
		}
		return snake;
	}
}
