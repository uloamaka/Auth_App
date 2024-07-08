const express = require('express');
const router = express.Router();
const Controller = require('./controller');

const Ctrl = new Controller();

router.get('/api/users/:id', Ctrl.getUser.bind(Ctrl)); 

module.exports = router;

