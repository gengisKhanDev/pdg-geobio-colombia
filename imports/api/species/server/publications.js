import { Meteor } from "meteor/meteor";
import { Species } from "../species";

Meteor.publish("species.all", function publishSpecies() {
  return Species.find();
});

Meteor.publish('species.pending', function () {
  return Species.find({ status: 'pending' });
});

Meteor.publish('species.mySpecies', function () {
  if (!this.userId) {
    return this.ready(); // Evita que se envíen datos si el usuario no está logueado
  }

  return Species.find({ "createdBy.id": this.userId });
});

Meteor.publish("species.photosPending", function () {
  return Species.find(
    { "photosUsers.status": "pending" },
    { fields: { scientificName: 1, photosUsers: 1 } }
  );
});
