const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    try{
      // populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
            populate: [
                {
                    path: 'user'
                },
                {
                    path: 'like'
                }
            ]
    }).populate('like');

    let users = await User.find({});

    let loggedInUser;
        if(req.user){   //  Find all the friends of the user if user is logged in
            loggedInUser = await User.findById(req.user._id)
            .populate({
                path: 'friendships',
                populate: [
                    {
                        path: 'from_user'  // ***** TODO: Don't set the password to browser  *****
                    },
                    {
                        path: 'to_user'   // ***** TODO: Don't set the password to browser  *****
                    }
                ]
            });

        }

    return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            loggedInUser:loggedInUser
        });
    }catch(err){
       console.log('Error',err);
       return;
    }

}

// module.exports.actionName = function(req, res){}

