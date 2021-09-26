 const express = require('express');
 const app = express();
 const port = 8000;

 app.use('/',require('./routes/index.js')); //use express router

 //setting up view engine

 app.set('view engine','ejs');
 app.set('views','./views'); //neighouring folder

 

 app.listen(port,function(err){
 	if(err){
 		// console.log('error',err);
 		console.log(`error in running the server : ${err}`); //interpolation :  the process of embedding an expression into part of a string
 	}
 	console.log(`server is running on port : ${port}`);
 });