Meteor.subscribe('cards');
Meteor.subscribe('lists');
Meteor.subscribe('statistics');
Meteor.subscribe('users');

Template.list.getCards = function(isListPublished) {
  return Cards.find({is_published : isListPublished});
};

Template.board.getLists = function(){
  return Lists.find({}, {sort: {order: 1}})
};

Template.board.getStatistics = function(){
  var user = getOnlyUser();
  if(user && !user["statistics"]){
    initializeStatistics(user);
  }
}

var getOnlyUser = function(){
  return Meteor.users.findOne();
}

var initializeStatistics = function(user){
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
  console.log(Meteor.users.find({"_id" : user["_id"]}));
  Meteor.users.update({_id : user["_id"]}, {$set : {"statistics" : defaultStatistics}});
  console.log("update!!!!");
};

Template.card.events({
  'click .publish': function(){
    Cards.update({_id : this._id}, {$set: {is_published : true}});
    updateAdToContentRatio();
  },
  'click .unpublish': function(){
    Cards.update({_id : this._id}, {$set: {is_published : false}});
    updateAdToContentRatio();
  }
});

Template.login.events({
  'click #facebook-login': function(event) {
      Meteor.loginWithFacebook({}, function(err){
          if (err) {
              throw new Meteor.Error("Facebook login failed");
          }
      });
  },
  'click #logout': function(event) {
      Meteor.logout(function(err){
          if (err) {
              throw new Meteor.Error("Logout failed");
          }
      })
  }
});

var updateElapsedTime = function(){
  var user = Session.get("currentUser");
  var oldTime = user["elapsedTime"];
  var newTime = oldTime == undefined ? 0 : oldTime + 1000;
};

var updateAdToContentRatio = function(){
    var user = Session.get("currentUser");

};

var calculateAudience = function(){};
var calculateServerCosts = function(){};
var calculateAdRevenue = function(){};
var calculateNetProfit = function(){};

var gameLoop = function(){
  updateElapsedTime();
  calculateAudience();
  calculateServerCosts();
  calculateAdRevenue();
  calculateNetProfit();
}