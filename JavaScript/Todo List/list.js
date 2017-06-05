var list = [];
var command = "";
while(command!=="quit"){
	if(command==="new"){
		list.push(prompt("Enter new todo:"));
	}
	else if(command==="list"){
		console.log(list);
	}
	command=prompt("What would you like to do?");
}
console.log("okay, you quit the app.");
