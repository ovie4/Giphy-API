$(document).ready(function(){
	//create button array
	var buttonArray = [];
	var gifArray = [];
	var input;
	//on submit button click
	$("#submitButton").on("click", function(event){
			event.preventDefault();
		//get input
		 input = $("#gifRequest").val();

		//create buttons and push to button array
    	var newButton = $("<button class='butts'>"+input+"</button>");
    	newButton.attr("id", input); //works
    	
    	var buttonId =(newButton[0].id);
    	buttonArray.push(buttonId);
    	console.log(buttonArray); //array of buttons
    	$("#buttons").append(newButton); //buttons to browser
    	
		//ajax pull to put in gif array
		//
		var request = input;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+request+"&api_key=xAduG3sIRYy42nOgRnMGP9RznumaSkFu&limit=6";
		
		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	
        gifArray.push(response.data);
        console.log (gifArray);
        });

        //on button click
        $("#buttons").on("click", ".butts", function(){
		var requester = this;
		console.log(requester.id);
		var gifName = requester.id;
		
        	//retrieve index #
        	for (var i = 0; i < buttonArray.length; i++) { 
        		if(gifName===buttonArray[i]){		//goes through all buttons
        			console.log(i);
        		}
        	}
        	//get corresponding gif info
        	//display gifs

        /*for (var i = 0; i < gifArray.length; i++) {
        	//for each gif, get rating and image(still and animate)
        	
        	gifRating = gifArray[i].rating;
        	gifStill = gifArray[i].images.fixed_height_still.url;
        	gifAnimate = gifArray[i].images.fixed_height.url;
        	//create container div
        	var newDiv = $("<div class=gifs>");
        	//populate with images
        	var newImages = $("<img>");
        	newImages.attr("src", gifAnimate);
        	newImages.attr("img-still", gifStill);
        	$("#images").append(newImages);
        	 //console.log(newImages);
        	
        }
        */
        })
        });
	//})

});