const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the subscriberSchema
const userSchema = new Schema({
  username: String,
  password: String,
});

// make this schema available to the Node application
module.exports = userSchema;
