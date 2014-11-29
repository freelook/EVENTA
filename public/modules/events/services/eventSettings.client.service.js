'use strict';

angular.module('events').factory('EventSettings',
    function($filter) {


        var KievOfficesAddresses = [
            {name: '28 Fizkultury Street,', id: 0, group: 'Kiev'},
            {name: '14B Kudryashova Street', id: 1, group: 'Kiev'},
            {name: '74 Zhylyanska Street', id: 2, group: 'Kiev'},
            {name: '17a Moskovskaya Street', id: 3, group: 'Dnipropetrovsk'},
            {name: '63, Kolomenskaya Street', id: 4, group: 'Kharkiv'},
            {name: '51 Kozytskogo Street', id: 5, group: 'Vinnytsia'},
            {name: '45 O.Stepanivny Street', id: 6, group: 'Lviv'}
        ];


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

        function getAddresses(){
            return KievOfficesAddresses;
        }

        return {
            getAddresses: getAddresses,
            dateFormat: getDateFormat,
            formatDate: formatDate,
            getProperDate: getProperDate,
            trimSplitTags: trimSplitTags
        };
    }
);
