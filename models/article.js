const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the subscriberSchema
const articleSchema = new Schema({
  title: String,
  description: String,
  url: String,
  likes: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// make this schema available to the Node application
module.exports = articleSchema;
