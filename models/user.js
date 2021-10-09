const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique: true
	},
	password:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	}
},{
	timestamps:true //creat and update time
});

const User = mongoose.model('user',userSchema);

module.exports = User;