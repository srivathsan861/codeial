const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
      
      //the user who sent the req

      from_user: {
      	type: mongoose.Schema.Types.ObjectId,
      	ref: 'User'
      },

      //the user who accepted the req, the naming is just to understand, otherwise user won't see a difference

      to_user: {
      	type: mongoose.Schema.Types.ObjectId,
      	ref: 'User'
      }
},{
	timestamps: true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship;