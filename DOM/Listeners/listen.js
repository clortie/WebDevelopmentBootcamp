// document.querySelector("button").addEventListener("click",function(){
// 	if(document.body.style.background!=="purple"){
// 		document.body.style.background="purple";
// 	}
// 	else{
// 		document.body.style.background="white";
// 	}
// });

document.querySelector("button").addEventListener("click",function(){
	document.body.classList.toggle("purple");
});
