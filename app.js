require('dotenv').config(); // Imports the information stored in our .env file

const express = require('express'); // Requiring the use of our express npm package installed with our dependencies
const app = express(); // creating an instance of express, allowing us to create an express app
const test = require('./controllers/testcontroller') // importing the router object created in this file location and storing it in a variable
const authTest = require('./controllers/authtestcontroller')
const user = require('./controllers/usercontroller')
const log = require('./controllers/logcontroller')
const sequelize = require('./db') // Connecting our app to our database

sequelize.sync(); // Creates tables that do not exist in our database. Can pass in 'force: true' to reset your tables

app.use(express.json()); /*
                            - Must go above any routes. Any routes above this statement will not be able to use express.json() and will break
                            - app.use(express.json()) tells the application that we want to process json data
                         */
app.use(require('./middleware/headers')) // Activating our headers.js middleware, like express.json() this must go before any routes


//  THESE ROUTES ARE EXPOSED, THEY DO NOT NEED AUTHORIZATION TO ACCESS //   

app.use('/test', test) // Calling app.use() (an express method) we create a base URL in our first argument. Our second argument we pass in our test variable, this will cause all routes written in testcontrollers.js to become subroutes
// base url = 'http://localhost:3000/test'      route to access our testcontroller get request = 'http://localhost:3000/test/'

app.use('/api/user', user) // creating a route to our user controller


// THESE ROUTES ARE PROTECTED, YOU MUST HAVE AUTHORIZATION TO REACH THEM //


app.use(require('./middleware/validate-session')) // Importing our validate session code to check for tokens before granting access to the lower routes

app.use('/api/log', log) // creating a route to our log controller
app.use('/authtest', authTest); // Creating a route to our authtest controller

app.listen(3000, () => {
    console.log('App is listening on 3000')
});
/*
    - app.listen uses express to start a UNIX socket and listen for connections on the given path( in this case, localhost:3000)
    - a simple console.log to fire when the connection is made.
*/