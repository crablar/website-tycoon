var deployedPrototype = true;

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
	        external_url: "www.caninecola.com",
	        visible_after: 0
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Conflict in Middle East",
	        img_url: "http://cdn.emergingmoney.com/wp-content/uploads/2012/06/Insurgent_attack_Iraqi_oil_pipeline_near_Taji-300x214.jpg",
	        external_url: "www.cnn.com",
	        visible_after: 0
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Sprite Cereal",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/006/original/spritecereal.jpg",
	        external_url: "www.sprite.com",
	        visible_after: 0
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "You won't BELIEVE how this octopus looks up close.",
	        img_url: "http://replicatedtypo.com/wp-content/uploads/2012/04/octopus.jpg",
	        external_url: "octopics.com",
	        visible_after: 6
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Study shows plastic healthier after being melted.",
	        img_url: "http://seenheardknown.com/wp-content/uploads/2013/04/Dr-Marko-Lens-marko-lens-zelens-zelens-luxury-skincare-luxury-skincare-skin-ageing-skin-cancer-beauty-doctor-scientist-plastic-surgeon-reconstructive-surgeon-master-of-science-phd-melanoma.jpg",
	        external_url: "studiesshow.com",
	        visible_after: 12
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Kanye releases new line of soups including 'Kidney Bean Chili' and 'New England Clam Chowder'",
	        img_url: "http://static.giantbomb.com/uploads/original/9/97934/1708690-kanye_west_estelle.jpg",
	        external_url: "shopify.com/kanyesoups",
	        visible_after: 18
	    });
	    
	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Does drone use cause obesity?",
	        img_url: "http://bloximages.chicago2.vip.townnews.com/journaltimes.com/content/tncms/assets/v3/editorial/0/59/059dc082-89ee-509f-92c5-e6909aec968b/53ece23b9d554.preview-620.jpg",
	        external_url: "dronefacts.com",
	        visible_after: 24
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Hershey's presents: Plastic Sucrose Globs",
	        img_url: "https://lh6.googleusercontent.com/-h6dbhU-v6-8/TW1dvII0nSI/AAAAAAAAABQ/jo9jqfJNGx0/s1600/tesla-and-the-bear.jpg",
	        external_url: "www.plasticsucrose.com",
	        visible_after: 30
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: false,
	    	summary: "Fringe Middle Eastern cult growing in popularity.",
	        img_url: "http://images.travelpod.com/tw_slides/ta00/9d1/82e/i-hasidic-jews-at-the-wailing-wall-hof-carmel.jpg",
	        external_url: "jcaa.com",
	        visible_after: 36
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Dropbox For Recipes",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/007/original/dropboxforrecipes.jpg",
	        external_url: "dropbox.com/recipe",
	        visible_after: 42
	    });

   	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Study shows males unaffected by female objectification.",
	        img_url: "http://www.open-lims.org/tl_files/open-lims/images/photos/scientists_490.jpg",
	        external_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	        visible_after: 48
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: true,
	    	summary: "Kanye releases new music streaming device.",
	        img_url: "http://worldtruth.tv/wp-content/uploads/2013/11/Kanye-West-362922-1-402.jpg",
	        external_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	        visible_after: 54
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Rulers.com",
	        img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/003/original/rulers.jpg",
	        external_url: "Rulers.com",
	        visible_after: 60
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Kammerce.com",
	        img_url: "",
	        external_url: "",
	        visible_after: 66
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Jimmy Wales to open chain of barbecue restaurants.",
	        img_url: "",
	        external_url: "wales-rumors.com",
	        visible_after: 72
	    });


	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Wikimeats, the place for savory barbecue",
	        img_url: "",
	        external_url: "wikimeats.com",
	        visible_after: 78
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Beats Music to release hypnosis product",
	        img_url: "",
	        external_url: "beats.com/hypnosis",
	        visible_after: 84
	    });

   	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "Study shows giants may exist.",
	        img_url: "",
	        external_url: "",
	        visible_after: 90
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "You won't believe what this cleric does next.",
	        img_url: "",
	        external_url: "",
	        visible_after: 96
	    });


	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "Olive Garden: July is marinara month",
	        img_url: "",
	        external_url: "",
	        visible_after: 102
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 108
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 114
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 120
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 126
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 132
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 138
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 144
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 150
	    });

	    
	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 156
	    });

		Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 162
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 168
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 174
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 180
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 186
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 192
	    });


	   	Cards.insert({
	    	is_ad: true,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 198
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 204
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 210
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 216
	    });


	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 222
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 228
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 234
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 240
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 246
	    });

	    
	   	Cards.insert({
	    	is_ad: true,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 252
	    });

	    Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 258
	    });

	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 264
	    });


	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 270
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 276
	    });

	    Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 282
	    });

	   	Cards.insert({
	    	is_ad: true,
	    	is_content: false,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 288
	    });


	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 294
	    });

	    
	   	Cards.insert({
	    	is_ad: false,
	    	is_content: true,
	    	summary: "",
	        img_url: "",
	        external_url: "",
	        visible_after: 300
	    });

	});
}
