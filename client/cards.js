Meteor.subscribe('cards');
Meteor.subscribe('lists');

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