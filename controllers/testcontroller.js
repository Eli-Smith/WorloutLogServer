const express = require('express') // Importing our express framework and setting it to a variable. This gives us access to our express methods
const router = express.Router(); // Sets the express Router() function to a variable. The Router() method returns a router object when called
const sequelize = require('../db'); // attaching our controller to our database
const TestModel = sequelize.import('../models/test'); // Importing our test model using sequelize

router.get('/', (req, res) => {
    res.send('Hey!! This is a test route!')
});

/*
    - (4) We start by calling our router object using our Router() method
    - (4) get() is one of the methods in the router obejct, this allows us to use the HTTP verb GET
    - (4) the get() method takes two arguments, the first argument is the path, in this case '/'
    - (4) the second argument is a callback function(sometimes referred to as a handler function)
    - (4) the application is listening for requests that match a specified route and method and when it "hears" one the callback function is invoked
    - (5) res.send() is an express method that can be called on our res argument. In this case our response param is a string.
*/


// PRACTICE TEST ROUTES!
router.get('/about', (req, res) => {
    res.send('This is an about route!')
});

router.get('/contact', (req, res) => {
    res.send({
        user: 'elijah.smith23@yahoo.com',
        name: 'Eli'
    })
});

router.get('/projects', (req, res) => {
    res.send(['Project 1', 'Project 2']);
})

router.get('/mycontacts', (req, res) => {
    res.send([
        {
        user: 'One',
        info: 111
        },
        {
        user: 'Two',
        info: 222
        },
        {
        user: 'Three',
        info: 333
        }
    ])
});

router.post('/one', (req, res) => { // Using the express router object to call our 'post' method and setting up our subroute to '/one'
    res.send("Got a post request.") // In our response we simply send a string
});

router.post('/two', (req, res) => { // Using the express router object to call our 'post' method and setting the subroute to '/two'
    let testData = 'Test data for endpoint two'; // Delcaring a variable and setting its value to a string

    TestModel // Calling our test model
        .create({ // Using sequelize to create a new table in our database using our Test model
            testdata: testData //setting a key/value pairing for out table. The column name will be 'testdata' and it's value will the value of 'testData' in this case a string
        }).then(datafromDatabase => { // using our .then() promise resolver we respond to the client (in this case postman) with a simple string
            res.send('Test two went through!') // string response
        })
});

router.post('/three', (req, res) => { // Using the express router object to call our 'post' method and setting the subroute to '/three/
    let testData = req.body.testdata.item; // Declaring a variable and setting its value to req.body.testdata.item
                                            /*
                                                - req is our request
                                                - body is the content inside of our request
                                                - testdata it a property of our body
                                                - item is a property of testdata
                                            */

    TestModel // Calling on our TestModel framework
        .create({ // create() is a Sequelize method. It creates a SQL statement that will insert our data into the database.
            testdata: testData   // testdata: testData is the key/value pair that will be passed to our db. testdata is a property of our req.body and TestData is a variable set to a value from inside our body object
        })
        res.send('Test three went through!') // response from the server
        console.log('Test Three Went Through') // console logs a simple string, testing to make sure everything is working
});

router.post('/four', (req, res) => { // Using the express router object to call our 'post' method and setting the subroute to '/four'
    let testData = req.body.testdata.item; // Declaring a variable and setting its value to req.body.testdata.item
    /*
        - req is our request
        - body is the content inside of our request
        - testdata it a property of our body
        - item is a property of testdata
    */

    TestModel // Calling our TestModel framework
        .create({ // create() is a sequelize method. It creates a SQL statement that will insert our data into the database.
            testdata: testData // Data to be pass to our db
        })
        .then( // .then() is a promise resolver. In this it's preventing our server response of being sent to the client before we're sure the data was succcesfully posted
            function() {
                res.send('Test 4') // simple string response
            }
        );
});

router.post('/five', (req, res) => { // Using our express Router() method to create a new router object and setting the subroute to '/five'
    let testData = req.body.testdata.item; // Declaring a variable and setting its value to req.body.testdate.item

    TestModel // calling our TestModel framework
        .create({ // using the create() sequelize method to creat a new table in our database
            testdata: testData // data being pass to our db
        })
        .then( // .then() promise resolver, waiting for our data to successfully post before firing
            function(data){ // callback function set to take in our response from create() as an argument
                res.send(data); // response from the server that is set to the data sent to the db
            }   
        )
});

router.post('/six', (req, res) => {
    let testData = req.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function(testdata) {
                res.json({ // instead using res.send() we invoke .json() to turn our data into a json object
                    testdata: testdata // The first 'testdata' is the name of our json object, while the second is the object itself which was passed to us from our create() method beforehand
                })
            }
        )
});

router.post('/seven', (req, res) => {
    let testData = req.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function createSuccess(testdata) {
                res.json({
                    testdata: testdata
                });
            },
            function createError(err) {
                res.send(500, err.message)
            }
        )
})


module.exports = router; // exports the module for usage outside of the file