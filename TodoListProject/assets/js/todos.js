// check off todos by clicking
$("ul").on("click","li",function(){
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click","span",function(){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

//Add todo
$("input[type='text']").keypress(function(event){
	//enter key
	if(event.which===13){
		//get new todo text
		var todoText = $(this).val();
		//clear the input field
		$(this).val("");
		//if input was not empty
		if(todoText!==""){
			// append new li to ul
			$("ul").append("<li><span><i class=\"fa fa-trash\"></i></span>"+todoText+"</li>");
		}
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
	console.log($("input"));
})
