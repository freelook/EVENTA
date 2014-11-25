'use strict';

/**
 * Module dependencies.
 */
var users = require('../../server/controllers/users'),
	events = require('../../server/controllers/events');

module.exports = function(app) {
	// event Routes
	app.route('/events')
		.get(events.list)
		.post(users.requiresLogin, events.create);

	app.route('/events/:eventId')
		.get(events.read)
		.put(users.requiresLogin, events.hasAuthorization, events.update)
		.delete(users.requiresLogin, events.hasAuthorization, events.delete);

	// Finish by binding the event middleware
	app.param('eventId', events.eventByID);
};
