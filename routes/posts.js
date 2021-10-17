const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controller/posts_controller');

router.post('/create',passport.checkAuthentication,pasporrtpostsController.create);

module.exports = router;