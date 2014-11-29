'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Speaker Schema
 */
var SpeakerSchema = new Schema({
	speakerId: {
		type: Number,
		default: 0
	},
	name: {
		type: String,
		default: ''
	},
	surname: {
		type: String,
		default: ''
	},
	company: {
		type: String,
		default: 'EPAM Systems'
	},
	title: {
		type: String,
		default: ''
	},
	bio: {
		type: String,
		default: ''
	},
    thumbnailUrl: {
		filesize: {type: String},
        filetype: {type: String},
        filename: {type: String},
        base64:  {type: String}
	}
	
});


mongoose.model('Speaker', SpeakerSchema);



