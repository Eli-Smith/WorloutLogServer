const Sequelize = require('sequelize'); // Importing the sequelize npm package

const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to expserver postgres database');
    },
    function(err){
        console.log(err);
    }
);

/*
    - VARIABLE AT LINE 3 -

    - Using the constructor to create a new sequelize object
    - identify the database to connect to using the following arguments
        - name of the db
        - password for the database
        - the host points to the local port for Sequelize. This is 5432
        - idtenify the QL dialect being used.

    - USING THE VARIABLE AT LINE 8 -

    - Use the variable to gain access SQL methods.
    - Use the authenticate() method which retruns a promise
    - Use our .then() promise resolver to fire a function if we're connected
        and fire an error if we're not
*/

module.exports = sequelize // exports the module for use outside of the file