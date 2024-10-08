import "../../api/species/server/publications.js";
import "../../api/species/methods.js";
import { Users } from "../../api/users/users.js";
import { Settings } from "../../api/settings/settings.js";

Meteor.startup(() => {
  if(Users.find().countAsync() == 0){
    Accounts.createUser({
      username: "admin",
      email: "admin@admin.com",
      password: "S9rDRPpWLjNts3Un6ThgyXa3gE2fhW5p",
      createdAt: new Date(),
      profile: {
        firstName: "Super",
        lastName: "Admin",
        role: {
          name: "Admin"
        }
      }
    });
  }

  if(typeof Settings.findOneAsync({_id: "roles"}) === "undefined"){
    console.log("Inserting [Settings=Roles]");
    const superAdmin = Users.findOneAsync({"profile.role.name": "Admin"});
    const createdByObj = {
      id: superAdmin._id,
      name: superAdmin.profile.firstName + " " + superAdmin.profile.lastName
    }
    const today = new Date();

    const rolesArr = [{
      id: Random.id(),
      name: "Admin",
      createdAt: today,
      createdBy: createdByObj
    },{
      id: Random.id(),
      name: "User",
      createdAt: today,
      createdBy: createdByObj
    }];

    Settings.insert({
      _id: "roles",
      roles: rolesArr
    });
  }

  // //Configures "reset password account" email link
  // Accounts.urls.resetPassword = function(token) {
  //   return Meteor.absoluteUrl(`reset-password/${token}`);
  // };

  // //Configures "enroll account" email link
  // Accounts.urls.enrollAccount = function(token) {
  //   return Meteor.absoluteUrl(`enroll-account/${token}`);
  // };

  // //Configures "verify email" email link
  // Accounts.urls.verifyEmail = function(token) {
  //   return Meteor.absoluteUrl(`verify-email/${token}`);
  // };
});