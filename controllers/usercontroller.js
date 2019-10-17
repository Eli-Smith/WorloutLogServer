const express = require('express') // Importing our express framework and setting it to a variable. This gives us access to our express methods
const router = express.Router(); // Sets the express Router() function to a variable. The Router() method returns a router object when called
const sequelize = require('../db'); // attaching our controller to our database
const UserModel = sequelize.import('../models/user'); // Importing our user model using sequelize
const jwt = require('jsonwebtoken'); // requiring our jsonwebtoken npm package
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('The user route is working!') // A get request to make sure we get a response from our server
});

// THIS WILL BE OUR CREATE USER ROUTE
router.post('/signup', (req, res) => { // Using our express Router() method to create a router object, calling the 'POST' method and setting the subroute to 'signup'
    let username = req.body.username; // Creating a variable to store the username property of our request
    let pass = req.body.passwordhash; // Creating a variable to store the passwordhash property of our request

    UserModel.create({ // calling our User Model framework and using the variable created above (lines 13 and 14) to create new user data in our db
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10) // Using the bcrypt.hashSync() method to encrypt user passwords before storing them in our db
    })
    .then( // .then() promise resolver to fire off after data is succesfully passed to database
        function createSuccess(user){ // declaring a function that takes in our data from above as an argument

                                    //1             //2
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); 
            /*
                - Declaring a variable to create a JWT
                - The .sign() method and requires two parameters, the payload and the signature
                    - (1) This is the payload, or data we're sending. user.id is the primary key of the user table and is the number assigned to the user when created in the database.
                    - (2) This is the signature, we use process.env to supply the signature without having it leaked outside of our local files
                - We pass in a third parameter to set how long the token will last {seconds*minutes*hours} in our case, one day
            */

            res.json({ // using res.json() to turn our data into a json object
                user: user, // User will be a key with the value of our user object returned from our .create() method.
                message: 'created', // message will be a key with the value of our 'created' string
                sessionToken: token // sessionToken will be a key with the value of calling our token variable
            });
        },
        function create(err) {
            res.send(500, err.message)
        }
    )
})


// THIS WILL BE OUR LOGIN ROUTE
router.post('/login', (req, res) => {

    UserModel.findOne({ where: { username: req.body.user.username}}) // Check to see if a match for our username was found
    
    .then(
        function(user) {
            if (user) { // If there is a username that matches in our db
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) { // Using bcrypt.compare() to decrypt our hashed password and using an anonymous function to handle the results
                    if(matches) { // if the unhashed password matches
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) // creating a variable to create a new jwt
                        res.json({ // responding with a json object
                            user: user,
                            message: 'Successfully authenticated',
                            sessionToken: token
                        });
                    } else { // if the password doesn't match
                        res.status(502).send({error: 'Failed to authenticate'})
                    }
                });
            } else {
                res.status(500).send({error: 'Failed to authenticate Password'}) // if our result does NOT match respond with an error message
            }
        },
        function (err) {
            res.status(501).send({error: 'Failed to authenticate Username'}) // if there is no username match in our db respong with an error message
        }
        )
        /* BREAKDOWN:
            - findOne() is a sequelize method that searches our database for a specific thing we tell it to look for.
            - where is an object within sequelize that tells the database to look for something that matches its properties
            - we're looking for the username column in the user table
            - the promise is then handled by our .then() promise resolver
            - if the promise is resolved we respond with our user data
            - if the promise is not resolved we respong with and error message
        */

})

module.exports = router; // exports the module for use outside of the module