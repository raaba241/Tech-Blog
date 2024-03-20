//Boiler plate 
const userRoutes = require('./userRoutes');
const router = require('express').Router();
const dashRoutes = require('./dashboard');

router.use('/users', userRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;
