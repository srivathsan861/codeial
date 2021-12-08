const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const queue = require('../config/kue');
const userEmailWorker = require('../workers/user_email_worker');
const Friendships = require("../models/friendship");


module.exports.profile = async function(req, res){
     let user = await User.findById(req.params.id);

    // Check if current user and the profile_user are friends or not
    let friend = false;
    let friendship = await Friendships.findOne({
        from_user: req.user._id,
        to_user: req.params.id
    });
    let friendshipReverse = await Friendships.findOne({
        from_user: req.params.id,
        to_user: req.user._id
    });

    // If they are friends
    if(friendship || friendshipReverse){
        friend = true;
    }

    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user,
        friendship: friend
    });


};



module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
        // req.flash('error','Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){
         let user = await User.findById(req.params.id);
         User.uploadedAvatar(req,res, function(err){
            if(err){
                console.log('*****Multer Error: ',err);
             }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //this is saving the path of avatar(uploded file) in avatar field in user
                   
                    //checking if user already has a avatar
                    if(user.avatar){
                     //if the file of that avatar exists
                     if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                     //deleting the file (old avatar)
                      fs.unlinkSync(path.join(__dirname,'..',user.avatar));

                      }

                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back'); 
         });
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function(req, res){
     if(req.isAuthenticated()){
        return res.redirect('/users/profile/<%= user.id %>');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                // console.log('error in creating user while signing up'); 
                req.flash("Error",err);
                return;
               }
                let job = queue.create('signup-successful', user).save(function(err)
                {
                    if(err)
                    {
                        console.log('Error in sending to the queue', err);
                        return;
                    }
                    console.log('Job enqueued', job.id);
                });
                console.log(user);
                req.flash('success','You have Signed Up, Login to continue ');
                return res.redirect('/users/sign-in');
            });
        }else{
            req.flash('error','User Already exists!!!!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.flash('success','You have logged out!');
    req.logout();
    return res.redirect('/');
}

module.exports.resetPassword = function(req,res){
    return res.render('reset_password',{
        title: 'Codeial | Reset Password',
        access: false
    });
}

module.exports.resetPassMail = function(req,res){
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user",err);
            return;
        }
        if(user){
            if(user.isTokenValid == false){
                 user.accessToken = crypto.randomBytes(30).toString('hex');
                 user.isTokenValid = true;
                 user.save();
            }

         let job = queue.create('user-emails', user).save(function(err){
            if(err)
                {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                // console.log('Job enqueued', job.id);
            });
            req.flash('success', 'Password reset link sent. Please check your mail');
            return res.redirect('/');
        }else{
            req.flash('error', 'User not found. Try again!');
            return res.redirect('back');
        }
    });
}

module.exports.setPassword = function(req, res)
{
    User.findOne({accessToken: req.params.accessToken}, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user', err);
            return;
        }
        if(user.isTokenValid)
        {
            return res.render('reset_password',
            {
                title: 'Codeial | Reset Password',
                access: true,
                accessToken: req.params.accessToken
            });
        }
        else
        {
            req.flash('error', 'Link expired');
            return res.redirect('/users/reset-password');
        }
    });
}

module.exports.updatePassword = function(req, res)
{
    User.findOne({accessToken: req.params.accessToken}, function(err, user)
    {
        if(err)
        {
            console.log('Error in finding user', err);
            return;
        }
        if(user.isTokenValid)
        {
            if(req.body.newPass == req.body.confirmPass)
            {
                user.password = req.body.newPass;
                user.isTokenValid = false;
                user.save();
                req.flash('success', "Password updated. Login now!");
                return res.redirect('/users/sign-in') 
            }
            else
            {
                req.flash('error', "Passwords don't match");
                return res.redirect('back');
            }
        }
        else
        {
            req.flash('error', 'Link expired');
            return res.redirect('/users/reset-password');
        }
    });

}

