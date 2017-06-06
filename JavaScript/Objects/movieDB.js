var movie = [
	{
		title:"In Bruges",
		rating:4,
		hasWatched:false
	},
	{
		title:"Other1",
		rating:0,
		hasWatched:true
	},
	{
		title:"Other2",
		rating:10,
		hasWatched:false
	},
	{
		title:"Last One",
		rating:0,
		hasWatched:false
	}
];

movie.forEach(function(x){
	var result = "You have ";
	if(x.hasWatched){
		result+="watched ";
	}
	else{
		result+="not watched ";
	}
	result+="\""+x.title+"\" - "+x.rating+" stars";
	console.log(result);
});
