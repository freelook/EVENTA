'use strict';

// Setting up route
angular.module('speakers').config(['$stateProvider',
	function($stateProvider) {
		// Events state routing
		$stateProvider.
		state('listSpeakers', {
			url: '/speakers',
			templateUrl: 'modules/speakers/views/list-speakers.client.view.html'
		}).
		state('createSpeaker', {
			url: '/speakers/create',
			templateUrl: 'modules/speakers/views/create-speaker.client.view.html'
		}).
		state('viewSpeaker', {
			url: '/speakers/:eventId',
			templateUrl: 'modules/speakers/views/view-speaker.client.view.html'
		}).
		state('editSpeaker', {
			url: '/speakers/:eventId/edit',
			templateUrl: 'modules/speakers/views/edit-speaker.client.view.html'
		});
	}
]);
