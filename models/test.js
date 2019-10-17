module.exports = (sequelize, DataTypes) => {
    return sequelize.define('test', {
        testdata: DataTypes.STRING
    });
};

/*
    - LINE BY LINE WALKTRHROUGH -
        - (1) Exports the model and allows sequelize to create the 'tests' table with the 'testdata' column
        - (1) Running and anonymous function that accepts two params (sequelize, DataTypes)
        - (2) Call on the sequelize define() method. define() maps our models properties to our database
        - (2) The first argument passed into our define() method is a string, this will become the name of our table in our pg database
        - (2) The second argument is an object. Any key/value pairs will become the columns in our table
        - (3) testdata will become a column in our new table
        - (3) DataTypes.STRING is our value for the testdata property. Because we define it as string only strings will be accepted into our db table
*/