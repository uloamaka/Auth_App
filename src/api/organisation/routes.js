const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const auth = require('../../middlewares/auth.guard');

const Ctrl = new Controller();

router.get('/api/organisations', auth, Ctrl.getOrg.bind(Ctrl)); // : [PROTECTED]
router.get('/api/organisations/:orgId', auth, Ctrl.getOrgById.bind(Ctrl)); // : [PROTECTED]
router.post('/api/organisations', auth, Ctrl.createOrg.bind(Ctrl)); // : [PROTECTED]
router.post(
    '/api/organisations/:orgId/users',
    auth,
    Ctrl.addOrgUserById.bind(Ctrl)
); // : [PROTECTED]

module.exports = router;
