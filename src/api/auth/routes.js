const express = require('express');
const router = express.Router();
const Controller = require('./controller');

const Ctrl = new Controller();

router.post('/auth/register', Ctrl.register.bind(Ctrl)); // [POST] /auth/register
router.post('/auth/login', Ctrl.login.bind(Ctrl)); // [POST] /auth/login


module.exports = router;
