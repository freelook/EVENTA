'use strict';

angular.module('events').factory('EventSettings',
    function($filter) {

        var dateFormat = 'yyyy/MM/dd';
        var timeFormat = 'hh:mm a';

        function getDateFormat(){
            return dateFormat;
        }

        function formatDate(date){
            if(date){
                return $filter('date')(date, 'yyyy/MM/dd');
            }
        }

        function getProperDate(date, time){
            var d = $filter('date')(date, dateFormat);
            var t = $filter('date')(time, timeFormat);
            return new Date(d + ' ' + t);
        }

        function trimSplitTags(tags){
            return tags.split(',').map(function(tag){
                return tag.trim();
            });
        }

        return {
            dateFormat: getDateFormat,
            formatDate: formatDate,
            getProperDate: getProperDate,
            trimSplitTags: trimSplitTags
        };
    }
);
