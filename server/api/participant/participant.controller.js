var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;
var fs = require('fs');
Parse.initialize(config.PARSE_APPID, config.PARSE_JSKEY);

exports.addParticipant = function(req, res) {
  var Participant = Parse.Object.extend('Participant');
  var newParticipant = new Participant();

  newParticipant.set('answers', new Array(20));

  newParticipant.save().then(function (result) {
      res.json(result);
    },
    function (err) {
      console.log(err);
      res.status(500).end();
    }
  );
};


exports.addAnswer = function(req, res) {
  var questionInfo = req.body.questionInfo;

  var Participant = Parse.Object.extend('Participant');
  var query = new Parse.Query(Participant);

  query.get(questionInfo.participantObjectId,{
    success: function (results) {
      //results.set('q' + questionInfo.question.number, questionInfo.answer);
      results.attributes.answers[questionInfo.question.number - 1] = questionInfo.answer;
      results.set('answers', results.attributes.answers);
      results.save().then(function (result) {
          res.send(200);
        },
        function (err) {
          console.log(err);
          res.status(500).end();
        }
      );
    }
    ,
    error: function (error) {
      console.log(error);
      res.status(500).end();
    }
  });
};


exports.deleteParticipant = function(req, res) {
  var objectId = req.params.id;
  var Participant = Parse.Object.extend("Participant");
  var query = new Parse.Query(Participant);

  query.get(objectId, {
    success: function(results) {
      // The object was retrieved successfully.
      results.destroy({});
      res.send(200);
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      res.send(500);
    }
  });
};
