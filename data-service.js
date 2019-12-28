const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: mpromise (mongoose's default promise library) is deprecated"

// Load the schemas
const subscriberSchema = require('./models/subscriber.js');


module.exports = function(mongoDBConnectionString){

    let Subscriber; // defined on connection to the new db instance

    return {
        connect: function(){
            return new Promise(function(resolve, reject){
                let db = mongoose.createConnection(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Subscriber = db.model("Subscriber", subscriberSchema);
                    resolve();
                });
            });
        },
        getAllSubscribers: function(){
            return new Promise(function(resolve, reject){
                Subscriber.find()
                //.sort({}) //optional "sort" - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
                .exec()
                .then((subscribers) => {
                    console.log("in get all subs:" + subscribers);
                    resolve(subscribers);
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
        addSubscriber: function (subscriberData) {
            return new Promise(function (resolve, reject) {
                
                // Create a newSubsriber from the subscriberData
                var newSubscriber = new Subscriber(subscriberData);

                newSubscriber.save((err, addedSubscriber) => {
                    if(err) {
                        reject(err);    
                    } else {
                        resolve(addedSubscriber._id);
                    }
                });
            });
        },      



    }

}