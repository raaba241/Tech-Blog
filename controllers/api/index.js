const express = require('express');
const blogPostRoutes = require('./blogPost');
const userRoutes = require('./userRoutes');

const app = express();

// Use routes
app.use('/blog', blogPostRoutes);
app.use('/user', userRoutes);


module.exports = app;