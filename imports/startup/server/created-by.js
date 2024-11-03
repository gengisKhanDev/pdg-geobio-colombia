import { Users } from "../../api/users/users.js";

if(Meteor.isServer){
  var methods = {};
  methods.getUser = async function(userId){
    const user = await Users.findOneAsync({_id: userId})
    return {
      id: user._id,
      name: user.profile.firstName + " " + user.profile.lastName
    };
  };
  module.exports = methods;
}
