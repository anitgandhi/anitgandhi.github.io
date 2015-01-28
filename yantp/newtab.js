// use imgur api to get a gallery of images, choose a random one's url, and display it

// Get these from options storage
var subreddit = "earthporn";
var sort = "top";
var date = "all";
var choices = [], temp = [];

// Create URL
imgurURL = "https://api.imgur.com/3/gallery/r/" + subreddit + "/" + sort + "/" + date + "/";

headers = {Authorization : 'Client-ID 127b1f6500c8ce6'};

$.ajax({
	url: imgurURL,
	type: 'get',
	headers: {Authorization: 'Client-ID 127b1f6500c8ce6'},
	dataType: 'json',
	success: function(response)
	{
		// Only keep the stuff we want
		choices = response.data;
		cleanChoices();
	}
});

function cleanChoices()
{
	attrToKeep = ["id", "title", "type", "width", "height"];

	$.each(choices, function(i, image)
	{
		// delete unnecessary attributes
		$.each(choices[i], function(j, attr)
		{
			if ($.inArray(j, attrToKeep) == -1)
			{
				delete choices[i][j];
			}
		});

		// Delete those that don't have a good enough resolution
		
		// Get current window dimensions
		mw = parseInt(screen.width, 10);
		mh = parseInt(screen.height, 10);

		// Get pic dimensions
		w = image.width;
		h = image.height;

		// Check resolution, only keep the ones good enough
		if ( (w >= mw) && (h >= mh) )
			temp.push(image);
	});

	choices = temp;

	// Save to storage
	/*
	chrome.storage.sync.clear();
	chrome.storage.sync.set({"choices" : choices});
	*/

	// Preload images

	// Move forward
	loadNext();
}

function loadNext()
{
	var choice;
	choice = choices[Math.floor(Math.random()*choices.length)];
	// Debugging
	$("#container").html(JSON.stringify(choice));

	var url = "http://i.imgur.com/" + choice.id + ".jpg";
	//alert(url);
	$('body').css("backgroundImage", "url('" + url + "')");

}

// remove "[oc] resolution"