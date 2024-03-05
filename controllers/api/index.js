//Boiler plate 
const userRoutes = require('./userRoutes');
const router = require('express').Router();
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
