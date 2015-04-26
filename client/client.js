Meteor.subscribe('cards');
Meteor.subscribe('lists');
Meteor.subscribe('statistics');
Meteor.subscribe('users');

Template.list.getCards = function(isListPublished) {
  var elapsedTime = getOnlyUser()["statistics"]["time_elapsed"];
  console.log(elapsedTime);
  return Cards.find({is_published : isListPublished, 'visible_after' : {$lte : elapsedTime}}, {sort : {visible_after : -1}});
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

Template.statistics.getAudience = function(){
  return getOnlyUser()["statistics"]["audience_size"];
}

Template.statistics.getServerCosts = function(){
  return getOnlyUser()["statistics"]["server_costs"];
}

Template.statistics.getAdRevenue = function(){
  return getOnlyUser()["statistics"]["ad_revenue"];
}

var getOnlyUser = function(){
  return Meteor.users.findOne();
}

Template.card.events({
  'click .publish': function(){
    var cardId = this._id;
    Cards.update({_id : cardId}, {$set: {is_published : true}});
    console.log("Publishing");
    Meteor.call('updateUserAfterPublicationChange', getOnlyUser()["_id"], 
      cardId, function(err, response){});
  },
  'click .unpublish': function(){
    var cardId = this._id;
    Cards.update({_id : this._id}, {$set: {is_published : false}});
    Meteor.call('updateUserAfterPublicationChange', getOnlyUser()["_id"], 
      cardId, function(err, response){});  }
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
  Meteor.call('updateUserElapsedTime', getOnlyUser()["_id"], function(err, response){});
};

var calculateAudience = function(){
  Meteor.call('updateUserAudience', getOnlyUser(), function(err, response){});
};

var calculateServerCosts = function(){
  Meteor.call('updateUserServerCosts', getOnlyUser(), function(err, response){});
};

var calculateAdRevenue = function(){
  Meteor.call('updateUserAdRevenue', getOnlyUser(), function(err, response){});
};

var calculateNetProfit = function(){
  Meteor.call('updateUserNetProfit', getOnlyUser(), function(err, response){});
};

var gameLoop = function(){
  updateElapsedTime();
  calculateAudience();
  calculateServerCosts();
  calculateAdRevenue();
  calculateNetProfit();
}

setInterval(gameLoop, 1000);