module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    })
}

/*
    - LINE BY LINE WALKTRHROUGH -
        - (1) Exports the model and allows sequelize to create the 'Users' table with the 'username' and 'passwordhash' columns
        - (1) Running and anonymous function that accepts two params (sequelize, DataTypes)
        - (2) Call on the sequelize define() method. define() maps our models properties to our database
        - (2) The first argument passed into our define() method is a string, this will become the name of our table in our pg database
        - (2) The second argument is an object. Any key/value pairs will become the columns in our table
        - (3 + 4) username and passwordhash will become  columns in our new table
        - (3 + 4) DataTypes.STRING is our value for the username and passwordhash property. Because we define it as string, only strings will be accepted into our db table
*/