const Sequelize = require('sequelize');

// Replace 'database', 'username', 'password', and 'host' with your actual database credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql', // Replace with your preferred database dialect
    port: 3306
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;


//making another push for today