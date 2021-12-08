
const queue = require('../config/kue');

const comentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
     console.log('emails worker is processing a job',job.data);
     comentsMailer.newComment(job.data);

     done();
});

// queue.process('post-owner-email', function(job, done)
// {
//     console.log('Comment email worker is processing a job (post owner)');
//     comentsMailer.newCommentOnPost(job.data);
//     done();
// });