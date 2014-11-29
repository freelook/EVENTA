'use strict';

//Events service used for communicating with the events REST endpoints
angular.module('speakers').factory('Speakers', ['$resource',
    function($resource) {
        return $resource('speakers/:speakerId', {
            speakerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
