//invitations.js
const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');

router.post('/', invitationController.createInvitation);
router.get('/', invitationController.getInvitations);

module.exports = router;
