/**
 * Created by Mykola_Turunov on 11/29/2014.
 */


'use strict';

//Events service used for communicating with the events REST endpoints
angular.module('events').factory('Speakers', ['$resource',
    function($resource) {
        return $resource('/speakers/:id', {
            query: {
                method: 'GET',
                isArray: true
            },
            show: { method: 'GET' }
        });
    }
]);
