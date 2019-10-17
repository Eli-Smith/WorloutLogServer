const express = require('express') // Importing our express framework and setting it to a variable. This gives us access to our express methods
const router = express.Router(); // Sets the express Router() function to a variable. The Router() method returns a router object when called
const sequelize = require('../db'); // attaching our controller to our database
const LogModel = sequelize.import('../models/log'); // Importing our user model using sequelize
const ValidateSession = require('../middleware/validate-session') // Requiring our session to have an unexpired jwt

router.get('/', (req, res) => {
    res.send('The Logs route is working!')
});

// THIS WILL ALLOW USERS TO CREATE WORKOUT LOGS

router.post('/logworkout', (req, res) => { // Using our express Router() method to create a new router object and setting the subroute to '/logworkout'
    let description = req.body.description; // Creating a new variable and setting its value to the description property found in our request object
    let definition = req.body.definition; // see line (14)
    let result = req.body.result; // see line (14)
    let owner = req.user.id; // Creating a variable and setting its value to the id property of our user object. The user object was created when our request was passed through our middleware validate-session function

    LogModel // Calling our table
        .create({ // Creating a new row in our table using sequelize
            // Passing in the following key/value pairs into our db staying true to our Log Model
            description: description,
            definition: definition,
            result: result,
            owner: owner
        })
        .then( function createSuccess(log){ // If successful the server will jsonify our data and send it back to the client in a json object
            res.json({
                log: log,
                message: 'Log created'
            })
        })
});

// THIS WILL ALLOW USERS TO GET ALL LOGS


router.get('/getall', (req, res) => {
    let userid = req.user.id // Grabbing the id of our currnet user

    LogModel.findAll(
        {where: {owner: userid}}) // Telling the findAll() method where to look
        .then(
            function findAllSuccess(logs) { // If successful, the server responds with a json object containing all the logs associated with the current user
                res.json(logs);
            },
            function findAllErrors(err) {
                res.send(500, err.message); // Error message
            }
        )
});

// THIS WILL ALLOW USERS TO GET SINGLE LOGS BY ID

router.get('/getsingle/:id', (req, res) => { // Creating a router object and setting the route to take in a parameter and pass it to our request '/:id' is the parameter
    let log = req.params.id; // Grabbing the parameter from our route
    let user = req.user.id;

    LogModel
        .findOne(
            {where: {id: log, owner: user}} // Telling the findOne() method to find one item with an id that matches our id parameter and belongs to the current user
        )
        .then(
            function logByIdSuccess(data) {
                res.json(data)
            },
            function logByIdError(err){
                res.send(500, err.message)
            }
        )
});

//THIS WILL ALLOW USERS TO UPDATE THEY'RE LOGS BY ID

router.put('/updatelog/:id', (req, res) => {
    let log = req.params.id;
    let newDesc = req.body.description;
    let newDef = req.body.definition;
    let newResult = req.body.result;

    LogModel
        .update({
            // These are the key/value pairs that will be changed in with our 'PUT' request
            description: newDesc,
            definition: newDef,
            result: newResult,
        },
        {where: {id: log}}) // Telling the update() method to look for a log that matches our id parameter
        .then(
            function updateSuccess(data) {
                res.json(data)
            },
            function updateError(err) {
                res.send(500, err.message)
            }
        )
            
});

// THIS WILL ALLOW USERS TO DELETE LOGS BY ID

router.delete('/deletelog/:id', (req, res) => {
    let log = req.params.id
    let userid = req.user.id

    LogModel
        .destroy({
            where: {id: log, owner: userid} // Telling our destroy() method where to look (----REMEMBER---- 'where' itself is an object! e.g { where: {-whatever key/value pairs you want to look for go here-}})
        })
        .then(
            function deleteSuccess(data){
                res.send('Log deleted')
            },
            function deleteError(err) {
                res.send(500, err.message)
            }
        )
})

module.exports = router;