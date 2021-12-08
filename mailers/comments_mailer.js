const nodeMAiler = require('../config/nodemailer');


//another way of exporting a function

exports.newComment = (comment) => {
	
	let htmlString = nodeMAiler.renderTemplate({comment: comment},'/comments/new_comment.ejs');

	nodeMAiler.transporter.sendMail({
       from: 'srivathsan861@gmail.com',
       to: comment.user.email,
       subject: "New Comment published!",
       html: htmlString
	},(err,info) => {
		if(err){
			console.log('Error in sending mail',err);
			return;
		}
		// console.log('Message sent',info);
		return;
	});
}


exports.newCommentOnPost = (comment,user) => 
{   
    let htmlString = nodeMAiler.renderTemplate({comment: comment}, '/comments/new_comment_on_post.ejs');
    console.log('Inside newCommentOnPost Mailer');
    // console.log('$$$$$$$$$$$$$$$$$',user.email);
    nodeMAiler.transporter.sendMail
    (
        {
            from: 'srivathsan861@gmail.com',
            to: user.email,
            subject: "New Comment on your Post!",
            html: htmlString
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}