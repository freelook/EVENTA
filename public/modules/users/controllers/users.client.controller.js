'use strict';

angular.module('users')
    .controller('UsersController',
    function ($scope, $stateParams, $location, Authentication, Users) {

        $scope.authentication = Authentication;

        $scope.create = function () {
            var user = new Users({

            });
            user.$save(function (response) {
                $location.path('users/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (user) {
            if (user) {
                user.$remove();

                for (var i in $scope.users) {
                    if ($scope.users[i] === user) {
                        $scope.users.splice(i, 1);
                    }
                }
            } else {
                $scope.user.$remove(function () {
                    $location.path('users');
                });
            }
        };

        $scope.update = function () {
            var user = $scope.user;

            user.$update(function () {
                $location.path('users/' + user._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.users = Users.query();
        };

        $scope.findOne = function () {
            $scope.user = Users.get({
                userId: $stateParams.userId
            });
        };

    }
);

