## Minty Fresh

![GitHub Logo](https://github.com/mintbean-group/Merge/blob/master/images/mintyFresh.PNG)
Format: ![Alt Text](url)


<h3>Contribute to This Project</h3>

<h4>Quick Note: Before you Start</h4>

> This guide requires that you have Node.js and MongoDB correctly installed on your system.  If you cannot execute the commands: `npm --version` or `mongorestore --version`, please [Install NodeJS](https://nodejs.org/) and/or [MongoDB](https://www.mongodb.com/) (See: the [Official Install Guide](https://docs.mongodb.com/manual/administration/install-community/) for detailed instructions).

Once you have cloned the repository, open it in Visual Studio Code and issue the command "npm install" from the integrated terminal.  This will look at the package.json file and add the required dependant modules.

If you open the "server.js" file, you will notice that the top 2 lines define the constants "mongoDBConnectionString" and "HTTP_PORT".  The HTTP_PORT is fine the way it is (unless you have a conflict on your local machine with this port), however the mongoDBConnectionString value will need to change.

## FRONT END

The front end portion was created in React.


## REST API AVAILABLE
The is a stand alone API that serves the collections on Minty Fresh should you wish to build your own front-end application:
Deployed at: https://t3minty-api.herokuapp.com/  and accepts all requests via for example fetch or axios.  Contact one of the team for the endpoint documentation. 










