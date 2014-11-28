'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Person Schema
 */
var PersonSchema = new Schema({
	personId: {
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
    user: {
        type: [{type: Schema.Types.ObjectId, ref: "UserModel"}],
        required: true
    },
	thumbnailUrl: {
		type: String,
		default: ''
	},
	rockstar: {
		type: Boolean,
		default: false
	},
	team: {
		type: Boolean,
		default: false
	},
	ribbons: {
		type: [{
			name: {type: String, default: ''},
			link: {type: String, default: ''}
		}],
		default: []
	},
	socials: {
		type: [{
			abbr: {type: String, default: ''},
			title: {type: String, default: ''}
		}],
		default: []
	}
});

mongoose.model('Person', PersonSchema);