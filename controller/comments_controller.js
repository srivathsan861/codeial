const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const User = require('../models/user');
const Like = require('../models/like');


module.exports.create = async function(req,res){
     try{
         let post = await Post.findById(req.body.post);   // name="post" for _id
          if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

                post.comments.push(comment);
                post.save();
                   

                  comment = await comment.populate('user','name email');

                  comment = await comment.populate('post');
                  // console.log("@@@@@@@@@@@@@",comment.post.user);
                  const id = comment.post.user.toString();
                  const email = await User.findById(id);
                  
                  // console.log(comment);

                  // console.log("*********");

                  // console.log(email);

                  // console.log("*********");

                  commentsMailer.newCommentOnPost(comment,email);
                  

                  
    

                  commentsMailer.newComment(comment);
                  let job1 = queue.create('emails',comment).save(function(err){
                    if(err){
                    console.log('Error in creating a queue',err);
                    return;
                    }
                    console.log('job enqueued',job1.id);
                  });

                //   let job2 = queue.create('post-owner-email', comment).save(function(err){
                // if(err){
                //     console.log('Error in sending to the queue', err);
                //     return;
                // }
                // console.log('Job enqueued', job2.id);
                //  });

                 if(req.xhr){
               return res.status(200).json({
                  data:{
                     comment: comment
                  },
                  message: "Comment  Created!"
               });
             } 
             
              req.flash('success','Comment added!');
              return res.redirect('/');
         }    
     }catch(err){
        req.flash('error',err);
        return res.redirect('back');
     }
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){ 

        let postId = comment.post;
        comment.remove();

       let post = await Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}}); //pulling out the comment

                //destroying the associated likes for this comment
                await Like.deleteMany({likeable: comment._id,onModel: 'Comment'});

                if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment_id : req.params.id
                            },
                            message:'Comment Deleted!'
                        });
                    }

       req.flash('success','Comment deleted!');
        return res.redirect('back');

        }else{
            req.flash('error','You cannot delete this comment');
            return res.redirect('back');
         }
     }catch(err){
        req.flash('error',err);
        return res.redirect('back');
     }
}