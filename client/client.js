Meteor.subscribe('cards');
Meteor.subscribe('lists');
Meteor.subscribe('statistics');
Meteor.subscribe('users');

Template.list.helpers({
  getCards : function(isListPublished) {
    user = getCurrentUser();
    if(!user || !user["statistics"]){
      console.log("Error: user is " + user);
      return;
    }
    var cardIds = isListPublished ? user["published_cards"] : user["unpublished_cards"];  
    return Cards.find({_id : {$in: cardIds}}, {sort : {visible_after : -1}});
  }
});

Template.board.helpers({
  getLists : function(){
    return Lists.find({}, {sort: {order: 1}})
  }
});

Template.statistics.helpers({ 
  initializeStatistics : function(){
    user = getCurrentUser();
    if(!user){
      console.log("Error: user is " + user);
      return;
    }
    if(user && !user["statistics"]){
      console.log("initializing statistics");
      Meteor.call('initializeStatistics', user, function(err, response){});
    };
  },
  getProfit : function(){
    user = getCurrentUser();
    if(!user || !user["statistics"]){
      console.log("Error: user is " + user);
      return;
    }
    return user["statistics"]["net_profit"];
  },
  getAudience : function(){
    user = getCurrentUser();
    if(!user || !user["statistics"]){
      console.log("Error: user is " + user);
      return;
    }
    return user["statistics"]["audience_size"];
  },
  getServerCosts : function(){
    user = getCurrentUser();
    if(!user || !user["statistics"]){
      console.log("Error: user is " + user);
      return;
    }
    return user["statistics"]["server_costs"];
  },
  getAdRevenue : function(){
    user = getCurrentUser();
    if(!user || !user["statistics"]){
      console.log("Error: user is " + user);
      return;
    }
    return user["statistics"]["ad_revenue"];
  }
});

var getCurrentUser = function(){
  var currentUser = Session.get("currentUser");
  return currentUser;
}

Template.card.events({
  'click .publish': function(){
    var cardId = this._id;
    Cards.update({_id : cardId}, {$set: {is_published : true}});
    Meteor.call('updateUserAfterPublicationChange', getCurrentUser()["_id"], 
      cardId, function(err, response){});
  },
  'click .unpublish': function(){
    var cardId = this._id;
    Cards.update({_id : this._id}, {$set: {is_published : false}});
    Meteor.call('updateUserAfterPublicationChange', getCurrentUser()["_id"], 
      cardId, function(err, response){});  }
});

Template.card.helpers({
  getStory : function(filename) {
    console.log(filename);
    Meteor.call('getStory', 'stories/' + filename, function(err, response){
      Session.set(filename + "response", response);
    });
    return Session.get(filename + "response");
  }
});

Template.login.helpers({
  setSessionUser : function(currentUser){
    Session.set({"currentUser" : currentUser});
  }
})

Template.login.events({
  'click #facebook-login': function(event) {
      Meteor.loginWithFacebook({}, function(err){
          if (err) {
              throw new Meteor.Error("Facebook login failed");
          }
      });
  },
  'click #logout': function(event) {
    Session.set({"currentUser" : undefined});
      Meteor.logout(function(err){
          if (err) {
              throw new Meteor.Error("Logout failed");
          }
      })
  }
});

var updateElapsedTime = function(){
  Meteor.call('updateUserElapsedTime', getCurrentUser(), function(err, response){});
};

var updateVisibleCards = function(){
  Meteor.call('updateUserVisibleCards', getCurrentUser(), function(err, response){});
};

var calculateAudience = function(){
  Meteor.call('updateUserAudience', getCurrentUser(), function(err, response){});
};

var calculateServerCosts = function(){
  Meteor.call('updateUserServerCosts', getCurrentUser(), function(err, response){});
};

var calculateAdRevenue = function(){
  Meteor.call('updateUserAdRevenue', getCurrentUser(), function(err, response){});
};

var calculateNetProfit = function(){
  Meteor.call('updateUserNetProfit', getCurrentUser(), function(err, response){});
};

var gameLoop = function(){
  updateElapsedTime();
  updateVisibleCards();
  calculateAudience();
  calculateServerCosts();
  calculateAdRevenue();
  calculateNetProfit();
}

setInterval(gameLoop, 1000);
