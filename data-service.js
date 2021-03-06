// Load the schemas
const mongoose = require("mongoose");
const articleSchema = require("./models/article");
const commentSchema = require("./models/comment");
const userSchema = require("./models/user");

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: mpromise (mongoose's default promise library) is deprecated"

module.exports = function (mongoDBConnectionString) {
  let Article; // defined on connection to the new db instance
  let Comment;
  let User;

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
          Article = db.model("Article", articleSchema);
          Comment = db.model("Comment", commentSchema);
          User = db.model("User", userSchema);
          resolve();
        });
      });
    },
    getAllArticlesRaw: function () {
      return new Promise(function (resolve, reject) {
        Article.find()
          .exec()
          .then((articles) => {
            resolve(articles);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllArticles: function () {
      return new Promise(function (resolve, reject) {
        Article.find()
          .sort({ likes: "desc" })
          // this must match the name of the collection in the database
          .populate("comments")
          .populate({
            path: "comments",
            populate: {
              path: "user",
              model: "User",
            },
          })
          .exec()
          .then((articles) => {
            resolve(articles);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateArticleById: function (articleId, article) {
      return new Promise(function (resolve, reject) {
        if (Object.keys(article).length > 0) {
          // if there is data to update
          Article.update(
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
        const newArticle = new Article(articleData);
        //
        newArticle.save((err, addedArticle) => {
          if (err) {
            reject(err);
          } else {
            resolve(addedArticle._id);
          }
        });
      });
    },

    addComment: function (commentData) {
      return new Promise(function (resolve, reject) {
        User.findOne({ email: commentData.tempUser })
          .exec()
          .then((user) => {
            commentData.user = user._id;
            const newComment = new Comment(commentData);
            newComment.save((err, addedComment) => {
              if (err) {
                reject(err);
              } else {
                resolve(addedComment._id);
              }
            });
          })
          .catch((err) => {});
      });
    },
    addUser: function (userData) {
      let user = {
        name: userData.nickname,
        email: userData.email,
        picture: userData.picture,
      };
      const newUser = new User(user);
      newUser.save((err, addedUser) => {});
    }, // end of addUser
  };
};
