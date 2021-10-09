 const express = require('express');
 const cookieParser = require('cookie-parser');
 const expressLayouts = require('express-ejs-layouts');
 const app = express();
 const port = 8000;
 const db = require('./config/mongoose.js');

 app.use(express.urlencoded()); //reading through the post request

 app.use(cookieParser());

  app.use(express.static('./assets'));
  app.use(expressLayouts); //should put before route
  app.set('layout extractStyles',true);
  app.set('layout extractScripts',true);


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