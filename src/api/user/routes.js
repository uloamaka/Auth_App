const express = require('express');
const router = express.Router();

const route = Router();
const Ctrl = new Controller();

route.get('/api/users/:id', Ctrl.getUser.bind(Ctrl)); 

module.exports = router;

