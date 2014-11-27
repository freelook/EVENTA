'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Event1 Schema
 */
var Event1Schema = new Schema({
	Event1Id: {
		type: Number,
		default: 0
	},
	name: {
		type: String,
		default: ''
	},
	days: [{
		day: {
			type: Date, 
			default: Date.now
		},
		tracks: [{
				track: {
					name: {
						type: String,
						default: ''
					},
					timeslots: [{
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
					}]
				}
		}]
	}]
});

mongoose.model('Event1', Event1Schema);
