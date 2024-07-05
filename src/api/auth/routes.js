const express = require('express');
const router = express.Router();
const Controller = require('./controller');

const route = Router();
const Ctrl = new Controller();

route.post('/auth/register', Ctrl.register.bind(Ctrl)); // [POST] /auth/register
route.post('/auth/login', Ctrl.login.bind(Ctrl)); // [POST] /auth/login


module.exports = router;
