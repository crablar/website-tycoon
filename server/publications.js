Meteor.publish('cards', function() {
    return Cards.find();
});

Meteor.publish('lists', function() {
    return Lists.find();
});

Meteor.publish('statistics', function() {
    return Statistics.find();
});

Meteor.publish('users', function() {
    return Meteor.users.find();
});