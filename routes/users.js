const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controller/users_controller');
// const friendshipsController = require('../controller/friendships_controller');


router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

// router.post('/togg-friend',friendshipsController.togg_friend);


router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.get('/sign-in', usersController.signIn);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),
    usersController.createSession);

router.get('/reset-password',usersController.resetPassword);
router.post('/send-reset-pass-mail', usersController.resetPassMail);
router.get('/reset-password/:accessToken', usersController.setPassword);
router.post('/update-password/:accessToken', usersController.updatePassword);

module.exports = router;