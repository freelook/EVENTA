'use strict';
/**
 * Created by Alyx on 24.11.2014.
 */
/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person');

//mongoose.connect('mongodb://localhost/test');

/**
 * Globals
 */
var person;

/**
 * Unit tests
 */
describe('Method Save', function() {

    it('should be able to save without problems', function(done) {

        person = new Person();

        return person.save(function(err) {
            should.not.exist(err);
            done();
        });
    });

//    it('should be able to show an error when try to save without title', function(done) {
//        article.title = '';
//
//        return article.save(function(err) {
//            should.exist(err);
//            done();
//        });
//    });
});