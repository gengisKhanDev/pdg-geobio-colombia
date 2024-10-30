import { Mongo } from "meteor/mongo";

export const Settings = new Mongo.Collection("settings");

if(Meteor.isServer){
  Meteor.publish("settings.all", () => {
    if(Meteor.userId()){
      return Settings.find({});
    }
    else {
      return [];
    }
  });
}