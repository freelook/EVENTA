'use strict';


// Configuring the Users module
angular.module('users', ['ui.bootstrap']).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Users', 'users', 'dropdown');
		Menus.addSubMenuItem('topbar', 'users', 'List users', 'users');
	}
]);


// Config HTTP Error Handling
angular.module('users').config(
	function($httpProvider) {

		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	});
