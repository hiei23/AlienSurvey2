'use strict';

var express = require('express');
var controller = require('./training.controller');

var router = express.Router();

router.get('/:type', controller.getTrainingQuestions);

module.exports = router;
