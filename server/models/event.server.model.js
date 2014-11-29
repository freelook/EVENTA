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
	created: {
		type: Date,
		default: Date.now
	},

	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},

	external: {
		type: Boolean,
		default: false
	},

	dsescription: {
		type: String,
		default: '',
		trim: true,
		required: 'Description cannot be blank'
	},

	startDateTime: {
		type: Date,
		default: Date.now
	},

	endDateTime: {
		type: Date,
		default: Date.now
	},

	backgroundImgUrl:
    {
        filesize: {type: String},
        filetype: {type: String},
        filename: {type: String},
        base64:  {type: String}

    },

	speakers: {
		type: [{type: Schema.Types.ObjectId, ref: 'SpeakerModel'}],
		required: true
	},

	partners: {
		type: [{type: Schema.Types.ObjectId, ref: 'PartnerModel'}],
		required: true
	},

	organizers: {
		type: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
		required: true
	},

	numberOfPersons: {
		type: Number,
		default: 0
	},

	attendants: {
		type: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
		required: true
	},


	schedule: [{
		day: {
			type: Date,
			default: Date.now
		},
		agenda: [{
			track: {
				name: {
					type: String,
					default: ''
				},
				sessions: [{
					timeslot: {
						start: {
							type: Date,
							default: Date.now
						},
						end: {
							type: Date,
							default: Date.now
						},
						title: {
							type: Number,
							default: 0
						},
						description: {
							type: String,
							default: '',
							trim: true,
							required: 'Description cannot be blank'
						},
						speakers: {
							type: [{type: Schema.Types.ObjectId, ref: 'SpeakerModel'}],
							required: true
						}
					}
				}]
			}
		}]
	}],

	location: {
		type: [{type: Schema.Types.ObjectId, ref: 'LocationModel'}],
		required: true
	}
});

mongoose.model('Event', EventSchema);
