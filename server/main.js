var resetEverything = true;
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
		  Meteor.users.update({_id : user["_id"]}, {$set : {"statistics" : defaultStatistics}});
		  Meteor.users.update({_id : user["_id"]}, {$set : {"published_cards" : []}});
		  Meteor.users.update({_id : user["_id"]}, {$set : {"unpublished_cards" : []}});
		},
		updateUserAfterPublicationChange : function(userId, cardId){
			var card = Cards.findOne({_id : cardId});
			var cardIsNowPublished = card["is_published"];
			var cardIsAd = card["is_ad"];
			var cardIsContent = card["is_content"];
			console.log(cardIsNowPublished + " " + cardIsAd + " " + cardIsContent);
			
			if(cardIsNowPublished){
				Meteor.users.update({_id :userId}, {$pull: {unpublished_cards : cardId}});
				Meteor.users.update({_id :userId}, {$push: {published_cards : cardId}});
				if(cardIsAd && cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : 1, "statistics.num_published_ads" : 1}});
				}
				else if(cardIsAd && !cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_ads" : 1}});
				}
				else if(!cardIsAd && cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : 1}});
				}
			}

			else{
				Meteor.users.update({_id :userId}, {$pull: {published_cards : cardId}});
				Meteor.users.update({_id :userId}, {$push: {unpublished_cards : cardId}});
				if(cardIsAd && cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_content" : -1, "statistics.num_published_ads" : -1}});
				}
				else if(cardIsAd && !cardIsContent){
					Meteor.users.update({_id : userId}, 
						{$inc :{"statistics.num_published_ads" : -1}});
				}
				else if(!cardIsAd && cardIsContent){
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
		updateUserVisibleCards : function(user) {
			var userElapsedTime = user["statistics"]["time_elapsed"];
			Cards.find({visible_after : userElapsedTime}).forEach(
				function(card){
					Meteor.users.update({"_id" : user["_id"]}, {$push : {unpublished_cards : card["_id"]}});
				}
			);
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
		},
		getStory : function(filename) {
			console.log(filename);
			console.log(Assets.getText(filename));
			return Assets.getText(filename);
		}
	});
});

Meteor.startup(function(){
	if(resetEverything){	
		Meteor.call('deleteEverything');
		Meteor.call('seedDatabase');
	}
});