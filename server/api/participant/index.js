'use strict';

var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.get('/', controller.addParticipant);
router.post('/', controller.addAnswer);
router.post('/delete', controller.deleteParticipant);
router.post('/add-email', controller.addEmail);
router.post('/tutorial', controller.incTutorial);
router.get('/results', controller.getParticipants);
module.exports = router;
