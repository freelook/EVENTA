'use strict';
/**
 * Created by Alyx on 24.11.2014.
 */
/**
 * Module dependencies.
 */
var speakers = require('../../server/controllers/speakers');

module.exports = function(app) {
    // Person Routes
    app.route('/speakers')
        .get(speakers.list);


    // Finish by binding the speaker middleware
    app.param('speakerId', speakers.speakerByID);
};