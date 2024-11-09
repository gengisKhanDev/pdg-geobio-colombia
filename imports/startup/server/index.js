import "../../api/species/server/publications.js";
import "../../api/species/methods.js";
import "../../api/users/server/publications.js";
import "../../api/users/methods.js";
import "./created-by.js";

import { Random } from "meteor/random";
import { Accounts } from "meteor/accounts-base";

import { Users } from "../../api/users/users.js";
import { Settings } from "../../api/settings/settings.js";

Meteor.startup(async () => {
  Accounts.config({
    forbidClientAccountCreation: false
  });
  let adminRole = Random.id();
  let userRole = Random.id();
  try {
    const userCount = await Users.find().countAsync();
    if (userCount === 0) {
      await Accounts.createUser({
        username: "admin",
        email: "admin@admin.com",
        password: "6l`0Uf;55k{^",
        createdAt: new Date(),
        profile: {
          firstName: "Super",
          lastName: "Admin",
          role: {
            id: adminRole,
            name: "Super Admin"
          }
        }
      });

      await Accounts.createUser({
        username: "user",
        email: "user@user.com",
        password: "Bx5EE8O(/77j",
        createdAt: new Date(),
        profile: {
          firstName: "User",
          lastName: "Test",
          role: {
            id: userRole,
            name: "User"
          }
        }
      });
      console.log('Usuarios creados correctamente');
    }
  } catch (error) {
    console.error("Error contando usuarios o creando usuarios:", error);
    return;
  }

  try {
    const setting = await Settings.findOneAsync({ _id: "roles" });
    const superAdmin = await Users.findOneAsync({ "profile.role.name": "Admin" });

    if (!setting && superAdmin) {
      console.log("Insertando [Settings=Roles]");
      const createdByObj = {
        id: superAdmin._id,
        name: `${superAdmin.profile.firstName} ${superAdmin.profile.lastName}`
      };
      const today = new Date();

      const rolesArr = [
        {
          id: adminRole,
          name: "Admin",
          createdAt: today,
          createdBy: createdByObj
        },
        {
          id: userRole,
          name: "User",
          createdAt: today,
          createdBy: createdByObj
        }
      ];

      await Settings.insertAsync({
        _id: "roles",
        roles: rolesArr
      });
      console.log("Roles insertados correctamente");
    }
  } catch (error) {
    console.error("Error insertando roles:", error);
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
