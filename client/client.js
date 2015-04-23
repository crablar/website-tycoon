Meteor.subscribe('cards');
Meteor.subscribe('lists');
Meteor.subscribe('statistics');

  console.log(Date.now());

  Template.list.getCards = function() {
    return Cards.find(
      {}
    );
  };

  Template.board.getLists = function(){
    return Lists.find({}, {sort: {order: 1}})
  };

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
