'use strict';

angular.module('events').controller('EventsController',
	function($scope, $stateParams, $location,$filter, Authentication, Events) {
		$scope.authentication = Authentication;
		$scope.tags = '';

		function trimSplitTags(tags){
			return tags.split(',').map(function(tag){
				return tag.trim();
			});
		}

		$scope.search = '';

		$scope.create = function() {
			var event = new Events({
				title: this.title,
				description: this.description,
				content: this.content,
				external: this.external,
				startDateTime: this.startDateTime,
				endDateTime: this.endDateTime,
				numberOfPersons: this.numberOfPersons,
				tags: trimSplitTags($scope.tags)
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
