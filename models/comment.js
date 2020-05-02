const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the subscriberSchema
const commentSchema = new Schema({
  comment: String,
  user: { type:Schema.Types.ObjectId, ref: 'User'},
  date: Date,
});

// make this schema available to the Node application
module.exports = commentSchema;
