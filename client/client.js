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

Template.statistics.initializeStatistics = function(){
  var user = getOnlyUser();
  if(user && !user["statistics"]){
    Meteor.call('initializeStatistics', user, function(err, response){});
  };
};

Template.statistics.getProfit = function(){
  return getOnlyUser()["statistics"]["net_profit"];
}

var getOnlyUser = function(){
  console.log(Meteor.users.findOne());
  return Meteor.users.findOne();
}

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