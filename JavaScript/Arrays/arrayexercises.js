/**
Print reverse
Take array as arg, print out the reverse, don't change original array.
**/

function printReverse(array){
	for(i=array.length-1;i>=0;i--){
		console.log(array[i]);
	}
}

/**
isUniform
take array as arg,
return true if all elements in array are identical
**/

function isUniform(array){
	for(i=0;i<array.length-1;i++){
		if(array[i]!==array[i+1]){
			return false;
		}
	}
	return true;
}

/**
sumArray
take array of numbers
return sum of all numbers in array
**/

function sumArray(array){
	var total=0;
	array.forEach(function(x){
		total+=x;
	});
	return total;
}

/**
max
take array of numbers
return max value in array
**/

function max(array){
	if(array.length>0){
		var max = array[0];
		for(i=1;i<array.length;i++){
			if(array[i]>max){
				max=array[i];
			}
		}
		return max;
	}
}
