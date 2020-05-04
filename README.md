## Minty News

![GitHub Logo](https://github.com/mintbean-group/Merge/blob/master/images/mintyFresh.PNG)


<h2> Deployed at:  https://t4minty.herokuapp.com/ </h2>

<h3>Contribute to This Project</h3>

<h4>Quick Note: Before you Start</h4>

> This guide requires that you have Node.js and MongoDB correctly installed on your system.  If you cannot execute the commands: `npm --version` or `mongorestore --version`, please [Install NodeJS](https://nodejs.org/) and/or [MongoDB](https://www.mongodb.com/) (See: the [Official Install Guide](https://docs.mongodb.com/manual/administration/install-community/) for detailed instructions).

Once you have cloned the repository, open it in Visual Studio Code and issue the command "npm install" from the integrated terminal.  This will look at the package.json file and add the required dependant modules.

If you open the "server.js" file, you will notice that the top 2 lines define the constants "mongoDBConnectionString" and "HTTP_PORT".  The HTTP_PORT is fine the way it is (unless you have a conflict on your local machine with this port), however the mongoDBConnectionString value will need to change. 

Once you aquire the connection string, set it as a secret variable in a .env file that you will create yourself.

The components used required Material UI's main packages, which are:

    require("dotenv").config();

The string will load to replace your mongoDBConnectionString as soon as the process enviornment is accessed. 

   MONGODB_CONNECTION_STRING="your string from mongoDB"

 Don't forget to put the .env file in your .gitignore otherwise it will be publicly visible, and also to configure an enviornment variable at your server's host. 


## FRONT END

The front end portion was created in React on Node.js using npx create-react-app.  Using build scripts, the frontend portion was compressed and then moved into the public folder of the application.  The back end portion serves the front by exposing the public folder as the root route as follows: 

    app.use(express.static("public"));

The calls to the backend portion are made via axios. 

## BACK END 

The back end portion was created with Express on Node.js. The persistence storage is facilitated by MongoDB and accessed through the Mongoose ORM.  Authorization for the application's front end is done through a thrid-party provider, Auth0.

## FUNCTIONALITY

<h4>General Experience: </h4> 
* ability to view articles
* ability to visit article links
* ability to view the amount of likes for each article 
* ability to view comments (not the creator of the comments)
* ability to register via an openId provider (Google) or user specified credentials


<h4> Authenticated Experiece </h4>
* ability to view articles
* ability to visit article links
* ability to view the amount of like for each article
* ability to upvote article
* ability to downvote article
* ability to view comments 
* ability to view the creator of the comment
* ability to view hello message with a user-specific image avatar 
* ability to login via an openId provider (Google) or user specified credentials
* ability to log out 



## REST API AVAILABLE
The is a stand alone API that serves the collections on Minty Fresh should you wish to build your own front-end application:
Deployed at: https://t3minty-api.herokuapp.com/  and accepts all requests via for example fetch or axios.  Contact one of the team for the endpoint documentation. 










