'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Partner Schema
 */
var PartnerSchema = new Schema({
	group: {
		type: String, 
		default: ''
	},
	elements: {
	type: [
		{
			name: {type: String, default: ''},
			description: {type: String, default: ''},
			link: {type: String, default: ''},
			imageUrl: {type: String, default: ''}
		}
	], 
	default: []
	}

});

mongoose.model('Partner', PartnerSchema);