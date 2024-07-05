const express = require('express');
const router = express.Router();
const Controller = require('./controller');

const route = Router();
const Ctrl = new Controller();

route.get('/api/organisations', Ctrl.getOrg.bind(Ctrl)); // : [PROTECTED]
route.get('api/organisations/:orgId', Ctrl.getOrgById.bind(Ctrl)); // : [PROTECTED]
route.post('/api/organisations', Ctrl.createOrg.bind(Ctrl)); // : [PROTECTED]
route.post('/api/organisations/:orgId/users', Ctrl.addOrgUserById.bind(Ctrl)); // : [PROTECTED]

module.exports = router;