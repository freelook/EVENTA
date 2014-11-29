'use strict';

angular.module('speakers').controller('SpeakersController',
	function($scope, $stateParams, $location, $filter, Authentication, Speakers) {
		$scope.authentication = Authentication;

		$scope.search = '';

		$scope.create = function() {
			var speaker = new Speakers({
				name: this.name,
                surname: this.surname,
                company: this.company,
                title: this.title,
                bio: this.bio,
                thumbnailUrl: this.thumbnailUrl

			});

            speaker.$save(function(response) {
				$location.path('speaker/' + response._id);

				$scope.name = '';
				$scope.speakers = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(speaker) {
			if (speaker) {
				event.$remove();

				for (var i in $scope.speakers) {
					if ($scope.speakers[i] === speaker) {
						$scope.speakers.splice(i, 1);
					}
				}
			} else {
				$scope.speaker.$remove(function() {
					$location.path('speaker');
				});
			}
		};

		$scope.update = function() {
			var speaker = $scope.speaker;

            speaker.$update(function() {
				$location.path('speaker/' + speaker._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.speakers = Speakers.query();
		};

		$scope.findOne = function() {
			$scope.speakers = Speakers.get({
				speakerId: $stateParams.speakerId
			});
		};
	}
);
