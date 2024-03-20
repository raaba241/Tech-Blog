//Boiler plate 
const userRoutes = require('./userRoutes');
const router = require('express').Router();
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
