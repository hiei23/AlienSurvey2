'use strict';

var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.get('/', controller.addParticipant);
router.post('/', controller.addAnswer);
router.post('/delete/:id', controller.deleteParticipant);
module.exports = router;
