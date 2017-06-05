var list = [];
var command = "";

while(command!=="quit"){
	if(command==="new"){
		list.push(prompt("Enter new todo:"));
		console.log(list[list.length-1]+" added to todos");
	}
	else if(command==="list"){
		if(list.length>0){
			console.log("**********");
			list.forEach(function(item,index){
				console.log(index+": "+item);
			});
			console.log("**********");
		}
		else{
			console.log("Nothing in todo list.");
		}
	}
	else if(command==="delete"){
		var item = Number(prompt("Enter index of todo to delete:"));
		if(item>=0&&item<list.length){
			list.splice(item,1);
			console.log("Index "+item+" successfully removed.");
		}
		else{
			console.log("Invalid index.");
		}
	}
	command=prompt("What would you like to do?");
}
console.log("okay, you quit the app.");
