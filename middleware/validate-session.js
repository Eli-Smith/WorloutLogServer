let jwt = require('jsonwebtoken'); // Requiring our jwt npm package
let sequelize = require('../db'); // Attaching our middleware to our database
let User = sequelize.import('../models/user'); // Importing our User Model

module.exports = function(req, res, next) { // Exporting the module for use in other files
    if (req.method == 'OPTIONS') { // If statement that checks the headers coming in with our request, in this case we're looking for the 'OPTIONS' header
        next() // If the header includes 'OPTIONS' move to the next step
    } else { // If the request does not have the headers required
        let sessionToken = req.headers.authorization; // Creating a variable to hold the jwt data held in our authorization header
        console.log(sessionToken); // Simple console log to see our jwt


        if (!sessionToken) return res.status(403).send({auth: false, message: 'No token provided'}); // If there is no token present, the server will respond with an error status and an object
        else { // if we do have a token
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => { // Verify our token using our 'sessionToken' variable (holding our current token) and processing it with our jwt signature. Passing either error or decoded into a function
            
            if(decoded){ // If our token was decoded
                User.findOne({where: {id: decoded.id}}).then(user => { // Scan our user table using the findOne() method. We're looking at the id column of our table and finding the id that matches the current decoded token user
                    req.user = user; // Letting the req.user be equal to the user found in our findOne() method
                    next() // Passing the request to it's next step and breaking us out of our if statement
                },
                function(){
                    res.status(401).send({error: 'Failed to authorize'}); // If for any reason we are not able to complete our if statement, the server will send a response and an error object
                });
            } else { // If our session token is not decoded
                res.status(400).send({error: 'Not authorized'}); // The server will respond with an error object
            }
        })
    }    
}
}