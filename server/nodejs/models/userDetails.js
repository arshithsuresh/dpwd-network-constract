const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();


// Setting up the schema
const User = new mongoose.Schema({
  username: String,
  password: String,
  name:String,
  organization:String,
  role:String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
