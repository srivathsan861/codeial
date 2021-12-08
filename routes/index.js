const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller.js');

console.log('router loaded');

router.get('/',homeController.home);

router.use('/users',require('./users.js')); //accessing users profile from index (that is root route) file

router.use('/posts',require('./posts')); 

router.use('/comments',require('./comments'));

router.use('/likes',require('./likes'));

router.use('/friendships', require('./friendships'));


router.use('/api',require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;