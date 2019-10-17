let router = require('express').Router(); // Using our express Router() method to creat a new router object
let sequelize = require('../db'); // Attaching our db to our authtest controller
let User = sequelize.import('../models/user'); // Importing our User table using sequelize
let AuthTestModel = sequelize.import('../models/authtest'); // Importing our AuthTest table using sequelize



// GET ALL ITEMS FOR INDIVIDUAL USER

router.get('/getall', (req, res) => { // Creating a new router object and setting the subroute to '/getall'
    let userid = req.user.id; // Creating a variable and setting its value to to the user id attached to our request. We get our user value after our request is passed throuhg our middleware validate session function

    AuthTestModel // Calling our Auth Test table
        .findAll({ // Looking through our db table
            where: {owner: userid} // Looking through the owner columns of our table and searching for matching userid
        })
        .then( // .then() promise resolver to fire when we recieve our data from our db
            function findAllSuccess(data) {
                res.json(data);  // the server responds with the jsonified data
            },
            function findAllError(err) { // If our promise fails the server responds with an error message
                res.send(500, err.message);
            }
        );
})


// POST A SINGLE ITEM FOR AN INDIVIDUAL USER

router.post('/create', (req, res) => { // Creating a new router object and setting the subroute to '/create'
    let owner = req.user.id; // Creating a variable and setting its value to the user id inside of our request. The user id is set when our request is passed through our middleware validate-session code
    let authTestData = req.body.authtestdata.item; // Creating a variable and setting its value to data held within the body of our request(----REMEMBER---- the body of our request must match our model exactly, our auth test model is expecting an authtestdata key/value)

    AuthTestModel // Accessing our db table
        .create({ // creating new data inside our db
            authtestdata: authTestData, // authtest will be set to the value of our req.body from our previously established variable
            owner: owner // Much like above, our owner key/value pair will be set to the value of owner variable established at the start of this 'post' request
        })
        .then( // .then() promise resolver to fire after our data is created
            function createSuccess(authtestdata) { 
                res.json({
                    authtestdata: authtestdata // the server responds with a json object, the object has a key/value pair of { authtestdata: the data we entered in our original post request being stored in an authtestdata variable}
                });
            },
            function createError(err) { // function to fire if the server encounters an error
                res.send(500, err.message); // the server responds with an error message
            }
        )
});


// GET A SINGLE ITEM FOR AN INDIVIDUAL USER


router.get('/get/:id', (req, res) => { // Using Router() to create a new router object and setting the subroute to a parameter of '/:id'
    let data = req.params.id; // creating a variable and setting its value to the parameter passed in from '/:id'
    let userid = req.user.id; // creating a variable and setting its value to the id of the current user

    AuthTestModel // Calling our table
        .findOne({ // Searching for one item in our table
            where: {id: data, owner: userid} // We are looking at the id column of our table for matching data from our param above and verifying that it belongs to the current user
        })
        .then(
            function findOneSuccess(data) {
                res.json(data); // if we find what we're looking for, the server will jsonify the data and send it back
            },
            function findOneError(err) {
                res.send(500, err.message) // if we don't find what we're looking for the server will respond with an error message
            }
        )
});


// DELETE ITEM FOR AN INDIVIDUAL USER

router.delete('/delete/:id', (req, res) => { // Creating a new router object and setting the subroute to '/delete/:id'
    let data = req.params.id; // Creating a variable and setting its value to the params passed in from our request(in this case the id)
    let userid = req.user.id; // Creating a new variable and setting its value to user id obtained from our validate-session middleware

    AuthTestModel // Calling our table
        .destroy({ // Calling the destroy() method
            where: {id: data, owner: userid} // Telling the method where to look. We are looking for data that matches the id passed in from our params and checking the users match
        })
        .then(
            function deleteLogSuccess(data) {
                res.send('You deleted a log'); // If we find and delete a log, the server will respong with a string
            },
            function deleteLogError(err) {
                res.send(500, err.message); // If an error occurs the server will repsond with an error message
            }
        )
});


// UPDATE THE ITEM FOR INDIVIDUAL USER

router.put('/update/:id', (req, res) => { // Creating a new router obeject and setting the subroute to '/update/:id'
    let data = req.params.id; // Creating a new variable and setting its value to the id passed in from our URL in the request
    let authtestdata = req.body.authtestdata.item; // Creating a new variable and setting its value to authtestdata item in the body of our request

    AuthTestModel // Calling our table
        .update({ // Using the sequelize update() method
            authtestdata: authtestdata // The method will change the value of our 'authtestdata' key to the value passed in from authtestdata variable
        },
        {where: {id: data}} // Telling the method where to look, we're looking in the id column for a value that matches our id param set to our data variable
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    authtestdata: authtestdata // If successful the server will respond with a json object containing our updated data
                });
            },
            function updateError(err) {
                res.send(500, err.message); // If unsuccessful the server will respong with and error message
            }
        )
        
})

module.exports = router;