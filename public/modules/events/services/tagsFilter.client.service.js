'use strict';

angular.module('events').filter('tagSearch', function(){
        function eventContainsTag(event, tagName){
            if(angular.isArray(event.tags)){
                return event.tags.join('').indexOf(tagName) > -1;
            }
            return false;
        }

        return function(events, tagName){
            if(angular.isArray(events)){
                return events.filter(function(event){
                    return eventContainsTag(event, tagName);
                });
            }
            return false;

        };
    }
);
