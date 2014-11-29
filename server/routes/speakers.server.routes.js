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

    app.route('/speakers/:speakerId')
        .get(speakers.read)
        .put(speakers.update)
        .delete(speakers.delete);

    app.route('/speakers/:speakerId')
        .get(speakers.read)
        .put(speakers.update)
        .delete(speakers.delete);


    // Finish by binding the speaker middleware
    app.param('speakerId', speakers.speakerByID);
};