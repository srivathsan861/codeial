// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const friendsController = require("../controller/friendships_controller");
// 
// router.get("/add-friend" , passport.checkAuthentication ,friendsController.addFriend);
// module.exports = router;

const express = require('express');

const router = express.Router();

const friendshipController = require('../controller/friendships_controller');


router.get('/toggle/:id', friendshipController.toggleFriendship);


module.exports = router;