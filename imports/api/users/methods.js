import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Settings } from "../settings/settings.js";
import { Users } from "../users/users.js";

Meteor.methods({
  async "users.signup"(firstName, lastName, email, password, rol) {
    this.unblock();

    check(firstName, String);
    check(lastName, String);
    check(email, String);
    check(password, String);
    check(rol, String);

    const emailExists = await Users.findOneAsync({ "emails.address": email });
    if (emailExists) {
      throw new Meteor.Error("email-exists", "This email is alredy used!");
    }

    try {
      let roleObj = {};
      const rolesData = await Settings.findOneAsync({ _id: "roles" });
      const rolesArray = rolesData.roles;

      const adminRole = rolesArray.find(role => role.name === rol);

      if (adminRole) {
        roleObj = {
          id: adminRole.id,
          name: adminRole.name
        };
      }

      const userId = Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName,
          role: roleObj
        }
      });

      return userId;

    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw new Meteor.Error("signup-failed", "Error al crear usuario: " + error.reason || error.message);
    }
  },
  async "users.deteleteUser"(id) {
    this.unblock();

    await Users.removeAsync({ _id: id  });

  }
});
