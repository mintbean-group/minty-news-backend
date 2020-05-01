// Load the schemas
const mongoose = require('mongoose');
const articleSchema = require("./models/article");
const commentSchema = require("./models/comment");
const userSchema = require("./models/user");

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: mpromise (mongoose's default promise library) is deprecated"


module.exports = function(mongoDBConnectionString){

    let Articles; // defined on connection to the new db instance
    let Comments;
    let Users;

    return {
        connect: function(){
            return new Promise(function(resolve, reject){
                let db = mongoose.createConnection(
                  "mongodb+srv://dbUser2:minty2@cluster0-ehk9u.mongodb.net/test?retryWrites=true&w=majority",
                  { useNewUrlParser: true, useUnifiedTopology: true }
                );
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Articles = db.model("Articles", articleSchema);
                    Comments = db.model("Comments", commentSchema);
                    Users = db.model("Users", userSchema);
                    resolve();
                });
            });
        },
        getAllArticles: function(){
            return new Promise(function(resolve, reject){
                Articles.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((articles) => {
                    console.log("in get all articles:" + articles);
                    resolve(articles);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
       
        // getSubscriberById: function(subscriberId){
        //     return new Promise(function(resolve,reject){

        //         Subscriber.find({_id: subscriberId})
        //         //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
        //         .limit(1)
        //         .exec()
        //         .then((subscriber) => {
        //             resolve(subscriber);
        //         })
        //         .catch((err)=>{
        //             reject(err);
        //         });
        //     })
        // },
      
        // updateSubscriberById: function (subscriberId, subscriberData) {
        //     return new Promise(function (resolve, reject) {
        //         if (Object.keys(subscriberData).length > 0) { // if there is data to update
        //             Subscriber.update({ _id: subscriberId }, // replace the current subscriber with data from subscriberData
        //                 {
        //                     $set: subscriberData
        //                 },
        //                 { multi: false })
        //                 .exec()
        //                 .then((data) => {
        //                     resolve(subscriberId);
        //                 })
        //                 .catch((err) => {
        //                     reject(err);
        //                 });
        //         } else {
        //             resolve();
        //         }
        //     });
        // },
        
        addArticle: function (articleData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newSubsriber from the subscriberData
                var newArticle = new Articles(articleData);
                newArticle.save((err, addedArticle) => {
                    if (err) {
                      reject(err);                           
                    } else {
                      resolve(addedArticle._id);
                    }
                });
            });
        },      



    }

}