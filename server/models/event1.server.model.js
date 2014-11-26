'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
	eventId: {
		type: Number,
		default: 0
	},
	name: {
		type: String,
		default: ''
	},
	days: {[
		day: {
			type: Date, 
			default: Date.now
		},
		tracks: {[
				track: {
					name: {
						type: String,
						default: ''
					}
					timeslots: {[
							timeslot: {
								start: {
									type: Date, 
									default: Date.now
								},
								end: {
									type: Date, 
									default: Date.now
								},
								session: {
									type: Number,
									default: 0
								}
							}
					]}
				}
		]}
	]}
});

mongoose.model('Event', EventSchema);
