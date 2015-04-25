	console.log("you souck");

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
					console.log("editing sponsored content");
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
				console.log("unpublishing something...");
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
				
		}
	});
});

if(!Cards.findOne()){	
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
	        is_published: false
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Conflict in Middle East",
	        img_url: "http://cdn.emergingmoney.com/wp-content/uploads/2012/06/Insurgent_attack_Iraqi_oil_pipeline_near_Taji-300x214.jpg",
	        lightbox_url: "www.cnn.com",
	        is_published: false
	    });
	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Sprite Cereal",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/006/original/spritecereal.jpg",
	        lightbox_url: "www.sprite.com",
	        is_published: false
	    });

	    //Sponsored content!
	    Cards.insert({
	    	is_ad: true,
	    	is_content: true,
	    	summary: "Kanye releases new music streaming device.",
	        img_url: "http://worldtruth.tv/wp-content/uploads/2013/11/Kanye-West-362922-1-402.jpg",
	        lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	        is_published: false
	    });
	});
}
