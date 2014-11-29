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

	description: {
		type: String,
		default: '',
		trim: true,
		required: 'Description cannot be blank'
	},

	content: {
		type: String,
		default: '',
		trim: true,
		required: false
	},

	startDate:{ type: Date },
	endDate: { type: Date },

	backgroundImgUrl:
    {
        filesize: {type: String},
        filetype: {type: String},
        filename: {type: String},
        base64:  {type: String}

    },

	speakers: {
		type: [{type: Schema.Types.ObjectId, ref: 'SpeakerModel'}],
		required: false
	},

	partners: {
		type: [{type: Schema.Types.ObjectId, ref: 'PartnerModel'}],
		required: false
	},

	organizers: {
		type: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
		required: false
	},

	numberOfPersons: {
		type: Number,
		default: 0
	},

	attendants: {
		type: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
		required: false
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
		type: Object,
		required: false
	},

	tags:{
		type: Array,
		require: false
	}
});

mongoose.model('Event', EventSchema);
