const router = require('express').Router();
const homeRoutes = require('./homeLane.js');
const apiRoutes = require('./api');
const sequelize = require('../connections/connection');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;