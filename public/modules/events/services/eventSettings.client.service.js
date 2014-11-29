'use strict';

angular.module('events').factory('EventSettings',
    function($filter) {

        var dateFormat = 'yyyy/MM/dd',
            timeFormat = 'hh:mm a',
            KIEV_OFFICES_ADDRESSES = [
                {name: 'Fizkultury St, 28,', id: 0, group: 'Kiev', coordinates: {latitude: 50.432212, longitude: 30.507915}},
                {name: 'Kudryashova St, 14B', id: 1, group: 'Kiev', coordinates: {latitude: 50.432223, longitude: 30.486109}},
                {name: 'Zhylyanska St, 74', id: 2, group: 'Kiev', coordinates: {latitude: 50.437418, longitude: 30.502163}},
                {name: 'Moskovskaya St, 17a', id: 3, group: 'Dnipropetrovsk', coordinates: {latitude: 48.467868, longitude: 35.045819}},
                {name: 'Kolomenskaya St, 63', id: 4, group: 'Kharkiv', coordinates: {latitude: 50.022476, longitude: 36.227384}},
                {name: 'Kozytskogo St, 51', id: 5, group: 'Vinnytsia', coordinates: {latitude: 49.232700, longitude: 28.469381}},
                {name: 'O.Stepanivny St, 45', id: 6, group: 'Lviv', coordinates: {latitude: 49.842985, longitude: 24.000391}}
        ];

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
        function getAddresses() {
            return KIEV_OFFICES_ADDRESSES;
        }

        return {
            dateFormat: getDateFormat,
            formatDate: formatDate,
            getProperDate: getProperDate,
            trimSplitTags: trimSplitTags,
            getAddresses: getAddresses
        };
    }
);
