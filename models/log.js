module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Log', {
        description: DataTypes.STRING,
        definition: DataTypes.STRING,
        result: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}
/*
    - LINE BY LINE WALKTRHROUGH -
        - (1) Exports the model and allows sequelize to create the 'Logs' table with the 'description', 'definition', 'result' and 'owner' columns
        - (1) Running and anonymous function that accepts two params (sequelize, DataTypes)
        - (2) Call on the sequelize define() method. define() maps our models properties to our database
        - (2) The first argument passed into our define() method is a string, this will become the name of our table in our pg database
        - (2) The second argument is an object. Any key/value pairs will become the columns in our table
        - (3 - 6) description, definition, result and owner will become columns in our new table
        - (3 - 6) DataTypes.STRING is our value for the description, definition and result properties. Because we define them as strings, only strings will be accepted into our db table
        -         DataTypes.INTEGER is the value of our owner property. Because we define it as an integer, only integers will be accepted into our db table  
*/