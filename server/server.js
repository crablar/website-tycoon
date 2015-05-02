var deployedPrototype = true;

Meteor.startup(function(){
	Meteor.methods({
		initializeStatistics : function(user){
		  console.log("USER" + user["_id"]);
		  var defaultStatistics = 
		    {
		      "net_profit": 0,
		      "ad_revenue": 0,
		      "num_published_ads": 0,
		      "num_published_content": 0,
		      "audience_size": 0,
		      "previous_ad_to_content_ratio": 0,
		      "ad_to_content_ratio": 1,
		      "server_costs": 0,
		      "account_created_at": 0,
		      "time_elapsed": 0
		    };
		  Meteor.users.update({_id : user["_id"]}, {$set : {"statistics" : defaultStatistics}});		  console.log("update!!!!");
		},
		updateUserAfterPublicationChange : function(userId, cardId){
			var card = Cards.findOne({_id : cardId});
			var cardIsNowPublished = card["is_published"];
			var cardIsAd = card["is_ad"];
			var cardIsContent = card["is_content"];
			console.log(cardIsNowPublished + " " + cardIsAd + " " + cardIsContent);
			
			if(cardIsNowPublished){
				if(cardIsAd && cardIsContent){
					console.log("Editing sponsored content");
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : 1, "statistics.num_published_ads" : 1}});
				}
				if(cardIsAd && !cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_ads" : 1}});
				}
				if(!cardIsAd && cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : 1}});
				}
			}

			else{
				console.log("Unpublishing something...");
				if(cardIsAd && cardIsContent){
					console.log("updating sponsored content to decrease publication");
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : -1, "statistics.num_published_ads" : -1}});
				}
				if(cardIsAd && !cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_ads" : -1}});
				}
				if(!cardIsAd && cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : -1}});
				}
			}

			var previousAdToContentRatio = Meteor.users.findOne({_id : userId})["statistics"]["ad_to_content_ratio"];
			var numPublishedAds = Meteor.users.findOne({_id : userId})["statistics"]["num_published_ads"];
			var numPublishedContent = Meteor.users.findOne({_id : userId})["statistics"]["num_published_content"];
			var newAdToContentRatio = numPublishedContent == 0
				? numPublishedAds : numPublishedAds / numPublishedContent;
			Meteor.users.update({_id : userId}, 
				{$set :{"statistics.ad_to_content_ratio" : newAdToContentRatio}});
			Meteor.users.update({_id : userId}, 
				{$set :{"statistics.previous_ad_to_content_ratio" : previousAdToContentRatio}});
				
		},
		updateUserElapsedTime : function(user) {
			console.log("updating elapsed time");
			if(!user || !user["statistics"]){
				console.log("Error: user is " + user + " and statistics is " + statistics);
				return;
			}
			Meteor.users.update({_id : user["_id"]}, 
				{$inc :{"statistics.time_elapsed" : 1}});
				
		},
		updateUserAudience : function(user) {
			if(!user || !user["statistics"]){
				console.log("Error: user is " + user + " and statistics is " + statistics);
				return;
			}
			console.log("updating audience");
			var oldAudience = user["statistics"]["audience_size"];
			console.log("old audience: " + oldAudience); 
			var adToContentRatio = user["statistics"]["ad_to_content_ratio"];
			var previousAdToContentRatio = user["statistics"]["previous_ad_to_content_ratio"];
			var newAudience = Math.floor(oldAudience * (previousAdToContentRatio - adToContentRatio));
			newAudience = newAudience <= 0 ? 1 : newAudience;
			console.log("new audience: " + newAudience);
			Meteor.users.update({_id : user["_id"]}, 
				{$inc :{"statistics.audience_size" : newAudience}});
		},
		updateUserServerCosts : function(user) {
			if(!user || !user["statistics"]){
				console.log("Error: user is " + user + " and statistics is " + statistics);
				return;
			}
			var audience = user["statistics"]["audience_size"];
			var numPublications = user["statistics"]["num_published_ads"] 
				+ user["statistics"]["num_published_content"];
			var additionalCosts = audience * numPublications;
			Meteor.users.update({_id : user["_id"]}, 
				{$inc :{"statistics.server_costs" : additionalCosts}});
		},
		updateUserAdRevenue : function(user) {
			if(!user || !user["statistics"]){
				console.log("Error: user is " + user + " and statistics is " + statistics);
				return;
			}
			var audience = user["statistics"]["audience_size"];
			var numAds = user["statistics"]["num_published_ads"];
			var additionalRevenue = audience * numAds;
			Meteor.users.update({_id : user["_id"]}, 
				{$inc :{"statistics.ad_revenue" : additionalRevenue}});
		},
		updateUserNetProfit : function(user) {
			if(!user || !user["statistics"]){
				console.log("Error: user is " + user + " and statistics is " + statistics);
				return;
			}
			var adRevenue = user["statistics"]["ad_revenue"];
			var serverCosts = user["statistics"]["server_costs"];
			var newProfit = adRevenue - serverCosts;
			Meteor.users.update({_id : user["_id"]}, 
				{$set :{"statistics.net_profit" : newProfit}});
		}
	});
});

if(deployedPrototype){	
	console.log('resetting everything');
	// Remove every element in the Meteor, then seed it
	Meteor.startup(function () {
	    var globalObject=Meteor.isClient?window:global;
	    for(var property in globalObject){
	        var object=globalObject[property];
	        if(object instanceof Meteor.Collection){
	            object.remove({});
	        }
	    }

	    // Build lists
	    Lists.insert({
	        name: 'Unpublished',
	        is_published: false,
	        order: 1
	    });
	    Lists.insert({
	        name: 'Published',
	        is_published: true,
	        order: 2 
	    });

	    // Build cards
	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Canine Cola",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/010/original/canine-cola.png",
	        lightbox_url: "www.caninecola.com",
	        is_published: false,
	        visible_after: 0
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Conflict in Middle East",
	        img_url: "http://cdn.emergingmoney.com/wp-content/uploads/2012/06/Insurgent_attack_Iraqi_oil_pipeline_near_Taji-300x214.jpg",
	        lightbox_url: "www.cnn.com",
	        is_published: false,
	        visible_after: 0
	    });
	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Sprite Cereal",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/006/original/spritecereal.jpg",
	        lightbox_url: "www.sprite.com",
	        is_published: false,
	        visible_after: 0
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "You won't BELIEVE how this octopus looks up close.",
	        img_url: "http://replicatedtypo.com/wp-content/uploads/2012/04/octopus.jpg",
	        lightbox_url: "octopics.com",
	        is_published: false,
	        visible_after: 6
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Study shows plastic healthier after being melted.",
	        img_url: "http://seenheardknown.com/wp-content/uploads/2013/04/Dr-Marko-Lens-marko-lens-zelens-zelens-luxury-skincare-luxury-skincare-skin-ageing-skin-cancer-beauty-doctor-scientist-plastic-surgeon-reconstructive-surgeon-master-of-science-phd-melanoma.jpg",
	        lightbox_url: "studiesshow.com",
	        is_published: false,
	        visible_after: 12
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Kanye releases new line of soups including 'Kidney Bean Chili' and 'New England Clam Chowder'",
	        img_url: "http://static.giantbomb.com/uploads/original/9/97934/1708690-kanye_west_estelle.jpg",
	        lightbox_url: "shopify.com/kanyesoups",
	        is_published: false,
	        visible_after: 18
	    });
	    
	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Does drone use cause obesity?",
	        img_url: "http://bloximages.chicago2.vip.townnews.com/journaltimes.com/content/tncms/assets/v3/editorial/0/59/059dc082-89ee-509f-92c5-e6909aec968b/53ece23b9d554.preview-620.jpg",
	        lightbox_url: "dronefacts.com",
	        is_published: false,
	        visible_after: 24
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Hershey's presents: Plastic Sucrose Globs",
	        img_url: "https://lh6.googleusercontent.com/-h6dbhU-v6-8/TW1dvII0nSI/AAAAAAAAABQ/jo9jqfJNGx0/s1600/tesla-and-the-bear.jpg",
	        lightbox_url: "www.plasticsucrose.com",
	        is_published: false,
	        visible_after: 30
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: false,
	    	summary: "Fringe Middle Eastern cult growing in popularity.",
	        img_url: "http://images.travelpod.com/tw_slides/ta00/9d1/82e/i-hasidic-jews-at-the-wailing-wall-hof-carmel.jpg",
	        lightbox_url: "jcaa.com",
	        is_published: false,
	        visible_after: 36
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Dropbox For Recipes",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/007/original/dropboxforrecipes.jpg",
	        lightbox_url: "dropbox.com/recipe",
	        is_published: false,
	        visible_after: 42
	    });

   	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Study shows males unaffected by female objectification.",
	        img_url: "http://www.open-lims.org/tl_files/open-lims/images/photos/scientists_490.jpg",
	        lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	        is_published: false,
	        visible_after: 48
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: true,
	    	summary: "Kanye releases new music streaming device.",
	        img_url: "http://worldtruth.tv/wp-content/uploads/2013/11/Kanye-West-362922-1-402.jpg",
	        lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	        is_published: false,
	        visible_after: 54
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Rulers.com",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/003/original/rulers.jpg",
	        lightbox_url: "Rulers.com",
	        is_published: false,
	        visible_after: 60
	    });

	});
}
