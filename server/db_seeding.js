Meteor.startup(function(){
	Meteor.methods({
		deleteEverything : function () {
		    var globalObject=Meteor.isClient?window:global;
		    for(var property in globalObject){
		        var object=globalObject[property];
		        if(object instanceof Meteor.Collection){
		            object.remove({});
		        }
		    }
		},
		seedDatabase : function(){
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
		    	headline: "Pfizer announces Clarikote, drug for Attention Surplus Activity Disorder",
		        img_url: "http://a876.g.akamai.net/7/876/1448/v00001/images.medscape.com/pi/features/drugdirectory/octupdate/ROX46500.jpg",
		        visible_after: 0,
		        storyFileName: "pfizer_clarikote.txt"
		    });

		    Cards.insert({
		    	is_ad: false,
		    	is_content: true,
		    	headline: "HP’s OfflineBox is for people who just want to disconnect from it all",
		        img_url: "http://pulse.8z.com/wp-content/uploads/2015/01/Old-person-using-computer.jpg",
		        visible_after: 0,
		        storyFileName: "hp_offlinebox.txt"
		    });

		    Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "IBM forms partnership with Pfizer to 3D print ASAD medication",
		        img_url: "http://i.telegraph.co.uk/multimedia/archive/03092/3d_printer_3092237b.jpg",
		        visible_after: 0,
		        storyFileName: "ibm_pfizer_partner.txt"
		    });

		    Cards.insert({
		    	is_ad: false,
		    	is_content: true,
		    	headline: "Young Rupesh’s new cooking oil contains no fat",
		        img_url: "http://thumbs.dreamstime.com/x/smart-young-guy-11246261.jpg",
		        visible_after: 6,
		        storyFileName: "rupesh_oil.txt"
		    });

		    Cards.insert({
		    	is_ad: false,
		    	is_content: true,
		    	headline: "Dannon announces kids yogurt cups with anti-ASAD compounds",
		        img_url: "http://www.raisehealthyeaters.com/wp-content/uploads/2010/08/yogurtboy.jpg",
		        lightbox_url: "studiesshow.com",
		        visible_after: 12,
		        storyFileName: "dannon_asad.txt"
		    });

		    Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "Kanye’s Kidney Bean Chili!",
		        img_url: "http://static.giantbomb.com/uploads/original/9/97934/1708690-kanye_west_estelle.jpg",
		        lightbox_url: "shopify.com/kanyesoups",
		        visible_after: 18,
		        storyFileName: "kanye_chili.txt",
		    });
		    
		    Cards.insert({
		    	is_ad: false,
		    	is_content: true,
		    	headline: "Airport security checkpoints to be used for human testing",
		        img_url: "http://imgs.sfgate.com/blogs/images/sfgate/cmcginnis/2010/11/22/IMG_4376600x450.JPG",
		        lightbox_url: "dronefacts.com",
		        visible_after: 24,
		        storyFileName: "airport_testing.txt"
		    });

		    Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "Robot-run BANK1 proudly claims zero workplace incidences of ASAD",
		        img_url: "http://www.comparestoreprices.co.uk/images/unbranded/s/unbranded-science-museum-robot-bank.jpg",
		        lightbox_url: "www.plasticsucrose.com",
		        visible_after: 30,
		        storyFileName: "bank1_no_asad.txt"
		    });

		    Cards.insert({
		    	is_ad: false,
		    	is_content: false,
		    	headline: "IBM finds resurgence in new markets",
		        img_url: "http://www.bloomberg.com/ss/06/07/top_brands/image/ibm.jpg",
		        lightbox_url: "jcaa.com",
		        visible_after: 36,
		        storyFileName: "ibm_resurgence.txt"
		    });

		    Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "Kanye West unveils new music streaming drone companion",
		        img_url: "http://static3.businessinsider.com/image/53e380bfecad04e14add5fcd-480/kanye-west.png",
		        lightbox_url: "dropbox.com/recipe",
		        visible_after: 42,
		        storyFileName: "kanye_drone.txt"
		    });

			    Cards.insert({
		    	is_ad: false,
		    	is_content: true,
		    	headline: "Kanye West unveils new jetpack",
		        img_url: "http://www.martinjetpack.com/images/phocagallery/safety-info.jpg",
		        lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
		        visible_after: 48,
		        storyFileName: "kanye_jetpack.txt"
		    });

		    Cards.insert({
		    	is_ad: true,
		    	is_content: true,
		    	headline: "Indian prime minister announces mandatory ASAD Testing for IITs",
		        img_url: "http://images.alternet.org/images/AFP/photo_1341554350663-1-0.jpg",
		        lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
		        visible_after: 54,
		        storyFileName: "indian_asad_iit.txt"
		    });

		   	Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "This new IBM product has users losing weight FAST",
		        img_url: "http://a.abcnews.com/images/Health/gty_diet_exercise_kb_130705_16x9_992.jpg",
		        lightbox_url: "Rulers.com",
		        visible_after: 60,
		        storyFileName: "ibm_lose_weight.txt"
		    });

		   	Cards.insert({
		    	is_ad: true,
		    	is_content: false,
		    	headline: "Indian youth protest IIT medical testing",
		        img_url: "http://www.pakistankakhudahafiz.com/pkkhnew/wp-content/uploads/2014/06/12-febkashmiri-students-protesting-against-hanging-of-afzal-guroo-in-new-delhi.jpg",
		        lightbox_url: "Rulers.com",
		        visible_after: 66,
		        storyFileName: "indian_youth_protest.txt"
		    });
		}
	});
});
