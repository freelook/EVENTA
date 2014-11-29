'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Speaker = mongoose.model('Speaker'),
    speakersData = require('../models/speaker.server.model').data,
	_ = require('lodash');
	
/**
 * Create a speaker
 */
exports.create = function(req, res) {
	var speaker = new Speaker(req.body);
	
	speaker.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * Show the current speaker
 */
exports.read = function(req, res) {
	res.jsonp(req.speaker);
};

/**
 * Update a speaker
 */
exports.update = function(req, res) {
	var speaker = req.speaker;

	speaker = _.extend(speaker, req.body);

	speaker.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * Delete an speaker
 */
exports.delete = function(req, res) {
	var speaker = req.speaker;

	speaker.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * List of Speaker
 */
exports.list = function(req, res) {

			res.jsonp(speakersData);
};

/**
 * Speaker middleware
 */
exports.speakerByID = function(req, res, next, id) {
	Speaker.findById(id).exec(function(err, speaker) {
		if (err) return next(err);
		if (!speaker) return next(new Error('Failed to load speaker ' + id));
		req.speaker = speaker;
		next();
	});
};