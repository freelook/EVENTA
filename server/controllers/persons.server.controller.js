'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Person = mongoose.model('Person'),
	_ = require('lodash');
	
/**
 * Create a person
 */
exports.create = function(req, res) {
	var person = new Person(req.body);
	
	person.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Show the current person
 */
exports.read = function(req, res) {
	res.jsonp(req.person);
};

/**
 * Update a person
 */
exports.update = function(req, res) {
	var person = req.person;

	person = _.extend(person, req.body);

	person.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Delete an person
 */
exports.delete = function(req, res) {
	var person = req.person;

	person.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * List of Person
 */
exports.list = function(req, res) {
	Person.find().exec(function(err, persons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(persons);
		}
	});
};

/**
 * List of Speakers
 */
exports.speakerList = function(req, res) {
    Person.find({rockstar : true}).exec(function(err, persons) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(persons);
        }
    });
};

/**
 * List of Teamplayers
 */
exports.teamList = function(req, res) {
    Person.find({team : true}).exec(function(err, persons) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(persons);
        }
    });
};

/**
 * Person middleware
 */
exports.personByID = function(req, res, next, id) {
	Person.findById(id).exec(function(err, person) {
		if (err) return next(err);
		if (!person) return next(new Error('Failed to load person ' + id));
		req.person = person;
		next();
	});
};