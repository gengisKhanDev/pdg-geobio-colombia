import { Meteor } from 'meteor/meteor';
import { Species } from '../species';

Meteor.publish('species.all', function publishSpecies() {
  return Species.find();
});
