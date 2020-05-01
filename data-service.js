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
      connect: function () {
        return new Promise(function (resolve, reject) {
          let db = mongoose.createConnection(mongoDBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          db.on("error", (err) => {
            reject(err);
          });

          db.once("open", () => {
            Articles = db.model("Articles", articleSchema);
            Comments = db.model("Comments", commentSchema);
            Users = db.model("Users", userSchema);
            resolve();
          });
        });
      },
      getAllArticles: function () {
        return new Promise(function (resolve, reject) {
          Articles.find()
            //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
            .exec()
            .then((articles) => {
              console.log("in get all articles:" + articles);
              resolve(articles);
            })
            .catch((err) => {
              reject(err);
            });
        });
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

      updateArticleById: function (articleId, article) {
        return new Promise(function (resolve, reject) {
          if (Object.keys(article).length > 0) {
            // if there is data to update
            Articles.update(
              { _id: articleId }, // replace the current article with data from articleData
              {
                $set: article,
              },
              { multi: false }
            )
              .exec()
              .then((data) => {
                resolve(articleId);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve();
          }
        });
      },

      addArticle: function (articleData) {
        return new Promise(function (resolve, reject) {
          // Create a newArticle from the articleData
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
    };

}