module.exports = function(sequelize, DataTypes) { // Exports our Auth Test model for use in other files
    return sequelize.define('authtestdata', {  // Using our sequelize method to create a new table in our db with the title 'authtestdata'
        authtestdata: DataTypes.STRING, // Our table will have two columns, 'authtestdata' and 'owner' which will accept a string and integer respectively
        owner: DataTypes.INTEGER
    })
}