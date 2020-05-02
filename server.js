const HTTP_PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const dataService = require("./data-service.js");
const {auth} = require("express-openid-connect");
const {requiresAuth} = require("express-openid-connect");

require("dotenv").config();

const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;
const data = dataService(mongoDBConnectionString);

// Use Standard Apache combined log output, https://www.npmjs.com/package/morgan#combined
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
app.use(morgan("combined"));

app.use(bodyParser.json());
// Article Routes

const config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: process.env.SECRET,
  },
  baseURL: "https://t4minty.herokuapp.com",
  clientID: "hBXHUy3VuP7zj0cRtKK1lB8YvwNRr9xR",
  issuerBaseURL: "https://dev-rk3u8fpc.auth0.com",
  allowedAudiences: "https://t4minty.herokuapp.com",
};
app.use(auth(config));

app.use(express.static('public'));


app.get("/articles", (req, res) => {
  data
    .getAllArticles()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).end();
    });
});


app.get("/articles-raw", (req, res) => {
  data
    .getAllArticlesRaw()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

// app.get("/subscriber/:subscriberId", (req,res) => {
//     data.getSubscriberById(req.params.subscriberId).then((data)=>{
//         if(data.length > 0){
//             res.json(data);
//         }else{
//             res.status(404).end();
//         }
//     })
//     .catch((err)=>{
//         res.status(500).end();
//     })
// });

app.put("/article/:articleId", requiresAuth(), (req, res) => {
  data
    .updateArticleById(req.params.articleId, req.body)
    .then((data) => {
      res.json({ message: "Article " + data + " updated successfully" });
    })
    .catch((err) => {
      res.status(500).end();
    });
});

// add brand new article to database
app.post("/article", requiresAuth(), (req, res) => {
  data
    .addArticle(req.body)
    .then((id) => {
      res.json(id);
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json(`duplicate key`);
      } else {
        res.status(500).end();
      }
    });
});

// Comment Routes

app.post("/comment", (req, res) => {
  data
    .addComment(req.body)
    .then((id) => {
      res.json({id: id});
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json(`duplicate key`);
      } else {
        res.status(500).end();
      }
    });
});

app.get("/display", requiresAuth(), (req, res) => {
  res.json(JSON.stringify(req.openid.user));  
});

// Catch-All 404 error

app.use((req, res) => {
  res.status(404).end();
});

// Connect to the DB and start the server

data
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("unable to start the server: ", err.message);
    console.log(
      "Did you remember to set your MongoDB Connection String in .env?"
    );
    process.exit();
  });


