'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.getQuestions);

module.exports = router;
