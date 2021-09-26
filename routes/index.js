const express = require('express');

const router = express.Router();

const homeController = require('../controller/home_controller.js');

router.get('/',homeController.home);

router.use('/users',require('./users.js')); //accessing users profile from index (that is root route) file

module.exports = router;