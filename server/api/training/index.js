'use strict';

var express = require('express');
var controller = require('./training.controller');

var router = express.Router();

router.get('/', controller.getTrainingQuestions);

module.exports = router;
