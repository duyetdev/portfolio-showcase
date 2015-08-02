'use strict';

var _ = require('lodash');
var Github = require('./github.model');
var GitHubApi = require("github");

// Get list of githubs
exports.index = function(req, res) {
  var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "DuyetDev-App" // GitHub is happy with a unique user agent
    }
  });

  github.user.getFrom({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "duyetdev"
  }, function(err, ress) {
      res.json(ress);
  });
};

// Get a single github
exports.show = function(req, res) {
  Github.findById(req.params.id, function (err, github) {
    if(err) { return handleError(res, err); }
    if(!github) { return res.status(404).send('Not Found'); }
    return res.json(github);
  });
};

// Creates a new github in the DB.
exports.create = function(req, res) {
  Github.create(req.body, function(err, github) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(github);
  });
};

// Updates an existing github in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Github.findById(req.params.id, function (err, github) {
    if (err) { return handleError(res, err); }
    if(!github) { return res.status(404).send('Not Found'); }
    var updated = _.merge(github, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(github);
    });
  });
};

// Deletes a github from the DB.
exports.destroy = function(req, res) {
  Github.findById(req.params.id, function (err, github) {
    if(err) { return handleError(res, err); }
    if(!github) { return res.status(404).send('Not Found'); }
    github.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}