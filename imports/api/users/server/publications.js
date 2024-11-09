import { Meteor } from "meteor/meteor";
import { Users } from "../users";

Meteor.publish("users.all", function publishSpecies() {
  return Users.find();
});

