'use strict';

angular.module('events').controller('EventsController',
	function($scope, $stateParams, $location, $filter, Authentication, Events, EventSettings) {
		$scope.authentication = Authentication;

		$scope.startDate = EventSettings.formatDate(new Date());
		$scope.endDate = EventSettings.formatDate(new Date());
		$scope.format = EventSettings.dateFormat;
		$scope.minDate = new Date();
		$scope.maxDate = '2020-12-31';
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
		//TimePricker settings
		$scope.startTime = new Date();
		$scope.endTime = new Date();
		$scope.hstep= 1;
		$scope.mstep= 15;

		$scope.numberOfPersons = 0;
		$scope.tags = '';
		$scope.external = false;
		$scope.search = '';

		$scope.openStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.startOpened = true;
		};
		$scope.openEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.endOpened = true;
		};

		$scope.create = function() {
			var event = new Events({
				title: this.title,
				description: this.description,
				content: this.content,
				external: this.external,
				startDate: EventSettings.getProperDate(this.startDate, this.startTime),
				endDate: EventSettings.getProperDate(this.endDate, this.endTime),
				numberOfPersons: this.numberOfPersons,
				tags: EventSettings.trimSplitTags($scope.tags),
                backgroundImgUrl: this.backgroundImgUrl
			});
			event.$save(function(response) {
				$location.path('events/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(event) {
			if (event) {
				event.$remove();

				for (var i in $scope.events) {
					if ($scope.events[i] === event) {
						$scope.events.splice(i, 1);
					}
				}
			} else {
				$scope.event.$remove(function() {
					$location.path('events');
				});
			}
		};

		$scope.update = function() {
			var event = $scope.event;

			event.$update(function() {
				$location.path('events/' + event._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.events = Events.query();
		};

		$scope.findOne = function() {
			$scope.event = Events.get({
				eventId: $stateParams.eventId
			});
		};
	}
);
