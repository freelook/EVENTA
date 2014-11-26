'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Session Schema
 */
var SessionSchema = new Schema({
	sessionId: {
		type: Number,
		default: 0
	},
	place: {
		type: String,
		default: ''
	},
	service: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	subtype: {
		type: String,
		default: ''
	},
	speakers:{
	type: [{
		speaker: {
			type: Number, 
			default: 0
		}
	}]
	language: {
		type: String,
		default: ''
	},
	complexity: {
		type: String,
		default: ''
	},
	presentation: {
		type: String,
		default: ''
	},
	video: {
		type: String,
		default: ''
	}

});

mongoose.model('Session', SessionSchema);


