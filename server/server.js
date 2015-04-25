if (Meteor.isServer) {
	// // Remove every element in the db, then seed it
	// Meteor.startup(function () {
	//     var globalObject=Meteor.isClient?window:global;
	//     for(var property in globalObject){
	//         var object=globalObject[property];
	//         if(object instanceof Meteor.Collection){
	//             object.remove({});
	//         }
	//     }

	//     // Build lists
	//     Lists.insert({
	//         name: 'Unpublished',
	//         is_published: false,
	//         order: 1
	//     });
	//     Lists.insert({
	//         name: 'Published',
	//         is_published: true,
	//         order: 2 
	//     });

	//     // Build cards
	//     Cards.insert({
	//     	is_ad: true,
	//     	is_content: false,
	//     	summary: "Canine Cola",
	//         img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/010/original/canine-cola.png",
	//         lightbox_url: "www.caninecola.com",
	//         is_published: false
	//     });

	//     Cards.insert({
	//     	is_ad: false,
	//     	is_content: true,
	//     	summary: "Conflict in Middle East",
	//         img_url: "http://cdn.emergingmoney.com/wp-content/uploads/2012/06/Insurgent_attack_Iraqi_oil_pipeline_near_Taji-300x214.jpg",
	//         lightbox_url: "www.cnn.com",
	//         is_published: false
	//     });
	//     Cards.insert({
	//     	is_ad: true,
	//     	is_content: false,
	//     	summary: "Sprite Cereal",
	//         img_url: "http://s3-us-west-2.amazonaws.com/creatad/creatives/images/000/000/006/original/spritecereal.jpg",
	//         lightbox_url: "www.sprite.com",
	//         is_published: false
	//     });
	//     Cards.insert({
	//     	is_ad: true,
	//     	is_content: true,
	//     	summary: "Kanye releases new music streaming device.",
	//         img_url: "http://worldtruth.tv/wp-content/uploads/2013/11/Kanye-West-362922-1-402.jpg",
	//         lightbox_url: "www.kanesic.com (article about strange, inconvenient wearable Kanye invents)",
	//         is_published: false
	//     });

	//     // Build stats
	//     Statistics.insert({
	//         user_id: "jeff",
	// 		net_profit: 0,
	// 		ad_revenue: 0,
	// 		num_published_ads: 0,
	// 		num_published_content: 0,
	// 		audience_size: 0,
	// 		previous_ad_to_content_ratio: 0,
	// 		ad_to_content_ratio: 1,
	// 		server_costs: 0,
	// 		account_created_at: 0,
	// 		time_elapsed: 0
	// 		});
	// });

}