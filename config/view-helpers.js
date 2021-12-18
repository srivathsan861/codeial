
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
	app.locals.assetPath = function(filePath){
	    // console.log("#######",filePath);
		if(env.name == "development"){
			return '/' + filePath;	
		}
		var ss = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
		// console.log("ful,i=ull ",ss);
		return  '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
	}
}