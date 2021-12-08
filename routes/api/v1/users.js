const express = require('express');

const router = express.Router();
const UsersApi = require('../../../controller/api/v1/users_api');

router.post('/create-session',UsersApi.createSession);

module.exports = router;