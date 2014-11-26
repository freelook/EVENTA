/**
 * Created by Alyx on 24.11.2014.
 */
/**
 * Module dependencies.
 */
var persons = require('../../server/controllers/persons');

module.exports = function(app) {
    // Person Routes
    app.route('/persons')
        .get(persons.list)
        .post(persons.create);

    app.route('/persons/:personId')
        .get(persons.read)
        .put(persons.update)
        .delete(persons.delete);

    // Finish by binding the person middleware
    app.param('personId', persons.personByID);
};