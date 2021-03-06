'use strict';

angular.module('events')
    .controller('EventsController',
    function ($scope, $window, $stateParams, $location, $filter, Authentication, Events, EventSettings, Speakers) {

        var DAFAULT_LOCATION = {latitude: 50.4020355, longitude: 30.5326905};
        $scope.authentication = Authentication;

        $scope.startDate = EventSettings.formatDate(new Date());
        $scope.endDate = EventSettings.formatDate(new Date());
        $scope.format = EventSettings.dateFormat;
        $scope.tags = '';
        $scope.search = '';
        $scope.selectedLocation = '';
        $scope.room = '';
        $scope.locations = EventSettings.getAddresses();
        $scope.minDate = new Date();
        $scope.maxDate = '2020-12-31';
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        //TimePricker settings
        $scope.startTime = new Date();
        $scope.endTime = new Date();
        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.numberOfPersons = 0;
        $scope.tags = '';
        $scope.external = false;
        $scope.search = '';

        $scope.map = {
            zoom: 12
        };

        $scope.marker = {
            id: 0,
            options: {
                draggable: false,
                labelAnchor: '100 0',
                labelClass: 'marker-labels'
            },
            coordinates: angular.copy(DAFAULT_LOCATION)
        };


        $scope.map.center = DAFAULT_LOCATION;

        function clearInputs(){
            $scope.title = '';
            $scope.content = '';
            $scope.description = '';
            $scope.numberOfPersons = 0;
            $scope.selectedLocation = '';
            $scope.tags = '';
            $scope.external = false;
            $scope.backgroundImgUrl = null;
            $scope.room = '';
        }

        $scope.openStartDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.startOpened = true;
        };
        $scope.openEndDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endOpened = true;
        };

        $scope.create = function () {
            var event = new Events({
                title: this.title,
                description: this.description,
                content: this.content,
                external: this.external,
                startDate: EventSettings.getProperDate(this.startDate, this.startTime),
                endDate: EventSettings.getProperDate(this.endDate, this.endTime),
                numberOfPersons: this.numberOfPersons,
                tags: EventSettings.trimSplitTags($scope.tags),
                backgroundImgUrl: this.backgroundImgUrl,
                location: this.selectedLocation,
                speakers: this.selectedSpeakers
            });
            event.$save(function (response) {
                $location.path('events/' + response._id);
                clearInputs();
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (event) {
            if (event) {
                event.$remove();

                for (var i in $scope.events) {
                    if ($scope.events[i] === event) {
                        $scope.events.splice(i, 1);
                    }
                }
            } else {
                $scope.event.$remove(function () {
                    $location.path('events');
                });
            }
        };

        $scope.update = function () {
            var event = $scope.event;
            event.location = $scope.selectedLocation;

            event.$update(function () {
                $location.path('events/' + event._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            Events.query(function(_events){
                $scope.events = EventSettings.parseDate(_events);
            });
        };

        $scope.findOne = function () {
            $scope.event = Events.get({
                eventId: $stateParams.eventId
            }, function (event) {
                if(event && event.location){
                    $scope.map.center = event.location.coordinates || DAFAULT_LOCATION;
                    $scope.marker.coordinates = angular.copy($scope.map.center);
                }
            });
        };

        $scope.options = {scrollwheel: false};

        $scope.locationUpdate = function(){
            $scope.map.center = $scope.selectedLocation.coordinates;
            $scope.marker.coordinates = angular.copy($scope.map.center);
        };

        $scope.isFilterVisible = false;
        $scope.toggleFilterVisibility = function(){
            $scope.isFilterVisible = !$scope.isFilterVisible;
        };

        $scope.showTags = function(event){
            return event.tags.join(', ');
        };

        $scope.tagName = '';

        $scope.isAdmin = function() {
            return $window.user && $window.user.roles[0] === 'admin';
        };

        $scope.selectedSpeaker = 'unselected';
        $scope.selectedSpeakers = [];

        $scope.addSpeaker = function(){
            var id = $scope.selectedSpeaker;
            $scope.selectedSpeakers.push(id);

            for (var i in $scope.speakers) {
                if ($scope.speakers[i]._id === id) {
                    $scope.speakers.splice(i, 1);
                }
            }

            $scope.selectedSpeaker = 'unselected';
        };

        $scope.speakers = Speakers.query();

    });
