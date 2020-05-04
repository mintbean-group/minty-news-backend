const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the subscriberSchema
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true},
  picture: String,
});

// make this schema available to the Node application
module.exports = userSchema;
