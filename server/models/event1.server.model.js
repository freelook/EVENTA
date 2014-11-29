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

    startDateTime: {
        type: Date,
        default: Date.now
    },

    endDateTime: {
        type: Date,
        default: Date.now
    },

    backgroundImgUrl: {
        type: String,
        default: 'background.png'
    },

    speakers: {
        type: [{type: Schema.Types.ObjectId, ref: "SpeakerModel"}],
        required: true
    },

    partners: {
        type: [{type: Schema.Types.ObjectId, ref: "PartnerModel"}],
        required: true
    },

    organizers: {
        type: [{type: Schema.Types.ObjectId, ref: "UserModel"}],
        required: true
    },

    numberOfPersons: {
        type: Number,
        default: 0
    },

    attendants: {
        type: [{type: Schema.Types.ObjectId, ref: "UserModel"}],
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
                                    type: [{type: Schema.Types.ObjectId, ref: "SpeakerModel"}],
                                    required: true
                                }
							}
					}]
				}
		}]
	}],

    location: {
        type: [{type: Schema.Types.ObjectId, ref: "LocationModel"}],
        required: true
    }

});

mongoose.model('Event1', Event1Schema);
