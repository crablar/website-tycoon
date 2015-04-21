Meteor.subscribe('cards');
Meteor.subscribe('lists');
Meteor.subscribe('statistics');

if (Meteor.isClient) {

  console.log(Date.now());

  Template.list.getCards = function(isPublished) {
    console.log("getting cards")
    return Cards.find(
      { is_published: isPublished}
    )
  }

  Template.board.helpers({
    lists: Lists.find({}, {sort: {order: 1}})
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
}
