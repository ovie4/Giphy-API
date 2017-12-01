$(document).ready(function(){
	//create initial array and display
	initialArray = ["messi","cannavaro","nesta","maradona","pele","ozil"]
	for (var i = 0; i < initialArray.length; i++) {
		createButton(initialArray[i]);
	}
	
	//function to get gifs and display them
	function displayGif(request){
		$.ajax({
          url: "https://api.giphy.com/v1/gifs/search?q="+request+"&api_key=xAduG3sIRYy42nOgRnMGP9RznumaSkFu&limit=10",
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	var gifData = response.data;
        	
        	for (var i = 0; i < gifData.length; i++) {
        		gifRating = gifData[i].rating;
	        	gifStill = gifData[i].images.fixed_height_still.url;
	        	gifAnimate = gifData[i].images.fixed_height.url;
	        	gifTitle = gifData[i].title;
	        	var newImages = $("<img>");
	        	newImages.addClass("gifs");
	        	newImages.attr("src", gifStill);
        		newImages.attr("imgStill", gifStill);
        		newImages.attr("imgAnimate", gifAnimate);
        		newImages.attr("alt", gifTitle);
        		newImages.attr("imgState", "static");
          		$("#images").append(newImages);
        	}
       	          
        });
	}
	//function to create buttons
	function createButton(input){
		
		var newButton = $("<button>");
		newButton.attr("id", input);
		newButton.attr("class", "gifButtons");
		newButton.text(input);
		$("#buttons").append(newButton);
	}
	//get user input 
	$("#submitButton").on("click", function(event){
		event.preventDefault();
		//get input
		 userInput = $("#gifRequest").val().trim();
		 $("#gifRequest").text("");
		 createButton(userInput);
		})

	//on clicking button, display gifs
	$("#buttons").on("click", ".gifButtons", function(){
		$("#images").empty();
		displayGif(this.id);
	})
	//on clicking image
	$("#images").on("click", ".gifs", function(){
		
		var state = $(this).attr("imgState");
		console.log(state);
		if(state==="static"){
			$(this).attr("src", $(this).attr("imgAnimate"));
			$(this).attr("imgState", "animated");
		}
		else{
			$(this).attr("src", $(this).attr("imgStill"));
			$(this).attr("imgState", "static");
		}

		/*if(gifAnimate===false){
			
			gifAnimate=true;
		}
		else{
			this.src=this.imgStill;
			gifAnimate=false;
		}*/
	})



})