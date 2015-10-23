var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;
var fs = require('fs');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

exports.getTrainingQuestions = function(req, res) {
  var TrainingQuestion = Parse.Object.extend('Training');
  var query = new Parse.Query(TrainingQuestion);

  query.equalTo('mode', parseInt(req.params.type));
  query.ascending('number');
  query.find({
    success: function (results) {
      res.json(results);
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });
};
