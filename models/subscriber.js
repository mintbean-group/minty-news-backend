var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the subscriberSchema
var subscriberSchema = new Schema({
    "FirstName": String,
    "LastName": String,
    "Company": String,
    "PhoneNum":String,
    "Email": {
        "type": String,
        "unique": true,
    },
    "Date": Date
});

// make this schema available to the Node application
module.exports = subscriberSchema;