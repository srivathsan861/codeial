const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs'); 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
	interval: '1d',
	path: logDirectory
});

const development = {
	name: "development",
	asset_path: '/assets',
	session_cookie_key: 'blahsomething',
	db: "codeial_development",
	smtp: {
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'srivathsan861@gmail.com',
		pass:  process.env.CODEIAL_DEV_GMAIL_PASSWORD
	 }
    },
    google_client_id: "685609719582-ejqnqrgnk2s6jic9aviokhak4s3bt0rk.apps.googleusercontent.com",
	google_client_Secret: "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",
	google_call_backURL: "http://localhost:8000/users/auth/google/callback",
	jwt_secret: "codeial",
	morgan: {
		mode: 'dev',
		options: {stream: accessLogStream}
	}
}

const production = {
	name: "production",
	asset_path: process.env.CODEIAL_ASSET_PATH,
	session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
	db: process.env.CODEIAL_DB,
	smtp: {
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.CODEIAL_GMAIL_USERNAME,
		pass: process.env.CODEIAL_GMAIL_PASSWORD
	 }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
	google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
	google_call_backURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
	jwt_secret: process.env.CODEIAL_JWT_SECRET,
	morgan: {
		mode: 'combined',
		options: {stream: accessLogStream}
	}
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;