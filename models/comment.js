const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},

	//comment belongs to a user
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
    //include the array of ids of all like in this comment schema itself
	 like: [
       {
   		type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
       }
     ],
},{
    timestamps: true
});

//telling mongoose that this is going to be a collection
const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;