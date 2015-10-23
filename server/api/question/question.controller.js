var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;
var fs = require('fs');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

exports.getQuestions = function(req, res) {
  var Question = Parse.Object.extend('Question');
  var query = new Parse.Query(Question);

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
