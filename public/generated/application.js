'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'app';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngMaterial',
        'ngTouch',
        'ngSanitize',
        'pascalprecht.translate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'uiGmapgoogle-maps',
        'naif.base64'
    ];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName)
	.config(
	["$locationProvider", "$translateProvider", function($locationProvider, $translateProvider) {
		$locationProvider.hashPrefix('!');
		$translateProvider.useStaticFilesLoader({
			prefix: '/i18n/resources-locale_',
			suffix: '.json'
		});

		$translateProvider.useLocalStorage();
		$translateProvider.preferredLanguage('en');
	}]
);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('events');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('speakers');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

'use strict';
angular
    .module('core')
    .run(
    ["$translate", "LocalStorage", function ($translate,  LocalStorage) {

        // Init data
        $translate.use(LocalStorage.getLocale());
    }]);

'use strict';

// Setting up route
angular.module('core').config(
    ["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/events');

        // Home state routing
        $stateProvider.
            state('home', {
                url: '/home',
                templateUrl: 'modules/core/views/home.client.view.html'
            });
    }]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core')
    .controller('HomeController',
    ["$scope", "Authentication", function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
// Example json
        $scope.events = [
            {
                date: '2014-10-24',
                dateReadable: 'October 24',
                tracks: [
                    {title: 'Android', color: '#90be4e'},
                    {title: 'Web & Cloud', color: '#03a9f4'},
                    {title: 'Community', color: '#e91e63'}
                ],
                timeslots: [
                    {
                        startTime: '10:00',
                        endTime: '10:45',
                        sessionIds: ['002', '003', '004']
                    },
                    {
                        startTime: '11:00',
                        endTime: '11:45',
                        sessionIds: ['003', '404', '004']
                    },
                    {
                        startTime: '12:00',
                        endTime: '11:45',
                        sessionIds: ['307']
                    }
                ]
            },
            {
                date: '2014-10-25',
                dateReadable: 'October 25',
                tracks: [
                    {title: 'Android', color: '#90be4e'},
                    {title: 'Web & Cloud', color: '#03a9f4'}
                ],
                timeslots: [
                    {
                        startTime: '10:00',
                        endTime: '10:45',
                        sessionIds: ['404', '002']
                    },
                    {
                        startTime: '11:00',
                        endTime: '11:45',
                        sessionIds: ['002', '003']
                    },
                    {
                        startTime: '13:00',
                        endTime: '13:45',
                        sessionIds: ['003']
                    },
                    {
                        startTime: '14:00',
                        endTime: '15:00',
                        sessionIds: ['503']
                    }
                ]
            }];
    }]);

'use strict';
angular
    .module('core')
    .controller('LangController', ["$scope", "$translate", function ($scope, $translate) {

        $scope.lang = $translate.use() || 'en';
        $scope.setLang = function () {
            $translate.use($scope.lang.toLocaleLowerCase());
        };
    }]);

'use strict';
angular
    .module('core')
    .factory('LocalStorage',
    ["$window", function ($window) {
        var LOCALE_KEY = 'NG_TRANSLATE_LANG_KEY';

        function _getItem(key, defaultValue, noParse) {
            var localStorageValue = noParse ?
                $window.localStorage.getItem(key) :
                JSON.parse($window.localStorage.getItem(key));

            if (!defaultValue) {
                defaultValue = null;
            }

            return (localStorageValue) ? localStorageValue : defaultValue;
        }

        function _setItem(key, value, noParse) {
            var localStorageValue = noParse ?
                value :
                JSON.stringify(value);
            $window.localStorage.setItem(key, localStorageValue);
        }

        function getLocale() {
            var lang = ($window.navigator.userLanguage || $window.navigator.language || 'EN_US').toLowerCase().split('-')[0];
            if (lang && lang !== 'ru') {
                lang = 'en';
            }

            return _getItem(LOCALE_KEY, lang, true);
        }

        function setLocale(lang) {
            _setItem(LOCALE_KEY, lang, true);
        }

        function getUser(socialName) {
            return _getItem(socialName);
        }

        function setUser(socialName, user) {
            _setItem(socialName, user);
        }

        return {
            getLocale: getLocale,
            setLocale: setLocale,
            getUser: getUser,
            setUser: setUser
        };
    }]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Events module
angular.module('events', ['ui.bootstrap']).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Events', 'events', 'dropdown', '/events(/create)?');
		Menus.addSubMenuItem('topbar', 'events', 'List Events', 'events');
		Menus.addSubMenuItem('topbar', 'events', 'New Event', 'events/create');
	}
]);

'use strict';

// Setting up route
angular.module('events').config(['$stateProvider',
	function($stateProvider) {
		// Events state routing
		$stateProvider.
		state('listEvents', {
			url: '/events',
			templateUrl: 'modules/events/views/list-events.client.view.html'
		}).
		state('createEvent', {
			url: '/events/create',
			templateUrl: 'modules/events/views/create-event.client.view.html'
		}).
		state('viewEvent', {
			url: '/events/:eventId',
			templateUrl: 'modules/events/views/view-event.client.view.html'
		}).
		state('editEvent', {
			url: '/events/:eventId/edit',
			templateUrl: 'modules/events/views/edit-event.client.view.html'
		});
	}
]);

'use strict';

angular.module('events')
    .controller('EventsController',
    ["$scope", "$stateParams", "$location", "$filter", "Authentication", "Events", "EventSettings", function ($scope, $stateParams, $location, $filter, Authentication, Events, EventSettings) {

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
            }
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
                location: this.selectedLocation
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
            });
            if($scope.event && $scope.event.location){
                $scope.map.center = $scope.event.location.coordinates;
            }
        };

        $scope.locationUpdate = function(){
            $scope.map.center = $scope.selectedLocation.coordinates;
        };
    }]
);

'use strict';

angular.module('events').factory('EventSettings',
    ["$filter", function($filter) {

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

        function parseDate(events){
            events.forEach(function(event){
               event.startDate = new Date(event.startDate);
               event.endDate = new Date(event.endDate);
               event.createDate = new Date(event.createDate);
            });
            return events;
        }

        return {
            parseDate : parseDate,
            dateFormat: getDateFormat,
            formatDate: formatDate,
            getProperDate: getProperDate,
            trimSplitTags: trimSplitTags,
            getAddresses: getAddresses
        };
    }]
);

'use strict';

//Events service used for communicating with the events REST endpoints
angular.module('events').factory('Events', ['$resource',
    function($resource) {
        return $resource('events/:eventId', {
            eventId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

/**
 * Created by Mykola_Turunov on 11/29/2014.
 */


'use strict';

//Events service used for communicating with the events REST endpoints
angular.module('events').factory('Speakers', ['$resource',
    function($resource) {
        return $resource('/speakers/', {
            query: {
                method: 'GET',
                isArray: true
            },
            show: { method: 'GET' }
        });
    }
]);

'use strict';

// Configuring the Events module
angular.module('speakers', ['ui.bootstrap']).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Speakers', 'speakers', 'dropdown', '/speakers(/create)?');
		Menus.addSubMenuItem('topbar', 'speakers', 'List Speakers', 'speakers');
		Menus.addSubMenuItem('topbar', 'speakers', 'New Speaker', 'speakers/create');
	}
]);

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

'use strict';

angular.module('speakers').controller('SpeakersController',
	["$scope", "$stateParams", "$location", "$filter", "Authentication", "Speakers", function($scope, $stateParams, $location, $filter, Authentication, Speakers) {
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
			$scope.event = Speakers.get({
				speakerId: $stateParams.speakerId
			});
		};
	}]
);

'use strict';

//Events service used for communicating with the events REST endpoints
angular.module('speakers').factory('Speakers', ['$resource',
    function($resource) {
        return $resource('speakers/:speakerId', {
            speakerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
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
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invlaid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [

	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/#!/\" class=\"navbar-brand\">EVENTA</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span translate=\"{{item.title}}\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/{{subitem.link}}\" translate=\"{{subitem.title}}\"></a></li></ul><a ng-switch-default=\"\" href=\"/#!/{{item.link}}\" translate=\"{{item.title}}\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signup\" translate=\"Sign Up\"></a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signin\" translate=\"Sign In\"></a></li><li class=\"divider-vertical\"></li><li><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" style=\"margin-top: 13px;margin-left: 10px\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"/#!/settings/profile\" translate=\"Edit Profile\"></a></li><li><a href=\"/#!/settings/accounts\" translate=\"Manage Social Accounts\"></a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a href=\"/#!/settings/password\" translate=\"Change Password\"></a></li><li class=\"divider\"></li><li><a href=\"/auth/signout\" translate=\"Signout\"></a></li></ul></li><li class=\"dropdown\"><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" class=\"form-control header__language\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/home.client.view.html",
    "<section id=\"schedule\" class=\"schedule\" ng-controller=\"HomeController\"><div class=\"content-wrapper\"><div ng-repeat=\"day in days\" class=\"schedule-table col-lg-8 col-md-10 col-md-offset-1\"><h4 class=\"schedule-table-heading\">{{day.dateReadable}}</h4><div class=\"timeslot track-header stick-header\"><div class=\"track-header-label\"><label translate=\"Day\"></label>{{day.$index}}</div><div class=\"timeslot-elements flexbox-wrapper\"><div ng-repeat=\"track in day.tracks\" class=\"track-header-slot col-md-{{12/day.tracks.length}} flexbox-item-height hidden-xs\"><h5 class=\"track-header-title\">{{track.title}}</h5></div><div class=\"track-header-slot col-xs-12 visible-xs\"><h5 class=\"slot-detail track-header-title\"></h5></div></div></div><div ng-repeat=\"timeslot in day.timeslots\" class=\"timeslot\" itemtype=\"http://schema.org/subEvent\"><div class=\"timeslot-label\"><time class=\"start-time\" itemprop=\"startDate\" datetime=\"{{day.dateReadable}}T{{timeslot.startTime}}\"><span>{{timeslot.startTime}}</span></time> <time class=\"end-time\" itemprop=\"endDate\" datetime=\"{{day.dateReadable}}T{{timeslot.endTime}}\"><span>{{timeslot.endTime}}</span></time></div></div></div></div></section>"
  );

  $templateCache.put("modules/events/views/create-event.client.view.html",
    "<section data-ng-controller=\"EventsController\"><div class=\"page-header\"><h1 translate=\"Add new event\"></h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\" translate=\"Title\"></label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"{{'Title of future event' | translate}}\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\" translate=\"Short Description\"></label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"{{'Add short description here' | translate}}\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__box2\"><div class=\"controls edit-event__checkbox\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"></div><label class=\"control-label edit-event__checkbox__label\" for=\"external\" translate=\"External event\"></label></div><div class=\"form-group col-sm-5 edit-event__box2\"><label class=\"control-label\" for=\"backgroundImgUrl\" translate=\"Add Background Image\"></label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" translate=\"Start Date\"></label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtStart\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\" translate=\"Start Time\"></label><div class=\"controls\"><timepicker ng-model=\"startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" for=\"endDate\" translate=\"End Date\"></label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtEnd\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\" translate=\"End Time\"></label><div class=\"controls\"><timepicker ng-model=\"endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"numberOfPersons\" translate=\"Number of participants\"></label><div class=\"controls col-sm-5\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\" value=\"0\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"content\" translate=\"Long description\"></label><div class=\"controls col-sm-10\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"{{'Tell more about your future event' | translate}}\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" translate=\"Location\"></label><div class=\"controls col-sm-5\"><select class=\"form-control\" ng-model=\"selectedLocation\" ng-change=\"locationUpdate()\" ng-options=\"location.name group by location.group for location in locations\"></select></div></div><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\"><ui-gmap-marker coords=\"map.center\" options=\"marker.options\" idkey=\"marker.id\"></ui-gmap-marker></ui-gmap-google-map><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\" translate=\"Tags\"></label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"{{'Keywords of your event' | translate}}\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><input type=\"submit\" class=\"btn btn-default\"></div></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/edit-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 translate=\"Edit Event\"></h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\" novalidate=\"\"><fieldset><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title of future event\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\">Short Description</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short description here\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__box2\"><div class=\"controls edit-event__checkbox\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"event.external\"></div><label class=\"control-label edit-event__checkbox__label\" for=\"external\">External event</label></div><div class=\"form-group col-sm-5 edit-event__box2\"><label class=\"control-label\" for=\"backgroundImgUrl\">Add Background Image</label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\">Start Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"event.dtStart\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\">Start Time</label><div class=\"controls\"><timepicker ng-model=\"event.startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" for=\"endDate\">End Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"event.dtEnd\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\">End Time</label><div class=\"controls\"><timepicker ng-model=\"event.endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"numberOfPersons\">Number of participants</label><div class=\"controls col-sm-5\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"event.numberOfPersons\" type=\"number\" value=\"0\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"content\">Long description</label><div class=\"controls col-sm-10\"><textarea name=\"content\" data-ng-model=\"event.content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Tell more about your future event\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\">Location</label><div class=\"controls col-sm-5\"><select class=\"form-control\" ng-model=\"event.selectedLocation\" ng-options=\"location.name group by location.group for location in locations\"></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\">Tags</label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"event.tags\" placeholder=\"Keywords of your event\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><input type=\"submit\" class=\"btn btn-default\" value=\"Update\"></div></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/list-events.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Find event for you' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"event in events | filter : search | orderBy: 'startDate'\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item events-list__item\"><img ng-src=\"images/event_thumbnail.png\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"event.title\"></h4><p class=\"list-group-item-text event-list__item__text\" data-ng-bind=\"event.description\"></p><p class=\"list-group-item-text event-list__item__text\"><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><br><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"events.$resolved && !events.length\"><label translate=\"No events yet, why don't you \"></label><a href=\"/#!/events/create\"><label traslate=\"create one\"></label></a>?</div></section>"
  );

  $templateCache.put("modules/events/views/view-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><div class=\"event__background\"><div class=\"event__filter\"><img ng-if=\"!!event.backgroundImgUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{event.backgroundImgUrl.base64}}\"> <img ng-if=\"!event.backgroundImgUrl.base64\" data-ng-src=\"/modules/core/img/header/slider-bg.jpg\"></div></div><h1 class=\"event__header\" data-ng-bind=\"event.title\"></h1><div><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><span style=\"padding-left: 5px;padding-right: 5px\">-</span><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></div><div class=\"pull-right\"><a class=\"btn btn-primary event__button\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary event__button\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><p class=\"lead\" data-ng-bind=\"event.description\"></p><h2 class=\"event__subheader\">Event location</h2><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\"><ui-gmap-marker coords=\"map.center\" options=\"marker.options\" idkey=\"marker.id\"></ui-gmap-marker></ui-gmap-google-map><h2 class=\"event__subheader\">Event description</h2><span data-ng-bind=\"event.content\"></span><div><div class=\"pull-right\" style=\"margin-top: 10px; width: 300px\"><span class=\"control-label col-sm-2\" translate=\"Number of participants\"></span> <span data-ng-bind=\"event.numberOfPersons\"></span> <span class=\"btn btn-primary\">+1</span></div></div></section>"
  );

  $templateCache.put("modules/speakers/views/create-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\"><div class=\"page-header\"><h1>Add new speaker</h1></div><div class=\"col-md-12\"><form name=\"speakerForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.name.$dirty && speakerForm.name.$invalid }\"><label class=\"control-label col-sm-2\" for=\"name\">Name</label><div class=\"controls col-sm-10\"><input name=\"name\" type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.surname.$dirty && speakerForm.surname.$invalid }\"><label class=\"control-label col-sm-2\" for=\"surname\">Surname</label><div class=\"controls col-sm-10\"><input name=\"surname\" type=\"text\" data-ng-model=\"surname\" id=\"surname\" class=\"form-control\" placeholder=\"Surname\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.title.$dirty && speakerForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.company.$dirty && speakerForm.company.$invalid }\"><label class=\"control-label col-sm-2\" for=\"company\">Company</label><div class=\"controls col-sm-10\"><input name=\"company\" type=\"text\" data-ng-model=\"company\" id=\"company\" class=\"form-control\" placeholder=\"Company\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.bio.$dirty && speakerForm.bio.$invalid }\"><label class=\"control-label col-sm-2\" for=\"bio\">Short biography</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"bio\" data-ng-model=\"bio\" id=\"bio\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short bio here\" required=\"\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"thumbnailUrl\">Speaker's Photo</label><div class=\"controls\"><input type=\"file\" id=\"thumbnailUrl\" ng-model=\"thumbnailUrl\" base-sixty-four-input=\"\"></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/speakers/views/edit-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Speaker</h1></div><div class=\"col-md-12\"><form name=\"speakerForm\" class=\"form-horizontal\" data-ng-submit=\"update(speakerForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.name.$invalid}\"><label class=\"control-label\" for=\"name\">Name</label><div class=\"controls\"><input name=\"name\" type=\"text\" data-ng-model=\"speaker.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required=\"\"></div><div ng-show=\"submitted && speakerForm.name.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.name.$error.required\" class=\"text-danger\">Name is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.surname.$invalid}\"><label class=\"control-label\" for=\"surname\">Surame</label><div class=\"controls\"><input name=\"surname\" type=\"text\" data-ng-model=\"speaker.surname\" id=\"surname\" class=\"form-control\" placeholder=\"Surname\" required=\"\"></div><div ng-show=\"submitted && speakerForm.surname.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.surname.$error.required\" class=\"text-danger\">Surname is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && speakerForm.bio.$invalid}\"><label class=\"control-label\" for=\"bio\">Bio</label><div class=\"controls\"><textarea name=\"bio\" data-ng-model=\"speaker.bio\" id=\"bio\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Bio cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && speakerForm.bio.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.bio.$error.required\" class=\"text-danger\">Bio cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/speakers/views/list-speakers.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Hall of fame' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"speaker in speakers | filter:search\" data-ng-href=\"#!/speakers/{{speaker._id}}\" class=\"list-group-item speakers-list__item\" flex=\"45\" flex-order=\"{{$index % 2}}\"><img data-ng-src=\"data:image/jpg;base64,{{speaker.thumbnailUrl.base64}}\"><h2>{{speaker.name + '&nbsp;' + speaker.surname}}</h2><h3>{{speaker.company}}</h3><h4>{{speaker.title}}</h4><p data-ng-bind-html=\"speaker.bio\"></p></a></div></section>"
  );

  $templateCache.put("modules/speakers/views/view-speakers.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>{{speaker.name + '&nbsp;' + speaker.surname}}</h1></div><div class=\"pull-right\"><a class=\"btn btn-primary\" href=\"/#!/speakers/{{speaker._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"event.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"event.user.displayName\"></span></em></small><p><img ng-if=\"!!speaker.thumbnailUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{speaker.thumbnailUrl.base64}}\"></p><p class=\"lead\" data-ng-bind=\"speaker.bio\"></p></section>"
  );

  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\" translate=\"Sign up using your EPAM accounts\"></h3><div class=\"col-md-12 text-center\"><a href=\"https://hrmstag.epam.com/workload/login.do\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/epam.jpg\"></a></div><h3 class=\"col-md-12 text-center\" translate=\"Or with your account\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"signin()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"username\" translate=\"Username\"></label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"form-group\"><label for=\"password\" translate=\"Password\"></label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"{{'Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\"><span translate=\"Sign In\"></span></button>&nbsp;<label translate=\"or\"></label>&nbsp; <a href=\"/#!/signup\" translate=\"Sign up\"></a></div><div class=\"forgot-password\"><a href=\"/#!/password/forgot\" translate=\"Forgot your password?\"></a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\" translate=\"Sign up using your EPAM accounts\"></h3><div class=\"col-md-12 text-center\"><a href=\"https://hrmstag.epam.com/workload/login.do\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/epam.jpg\"></a></div><h3 class=\"col-md-12 text-center\" translate=\"Or with your email\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"signup()\" class=\"signin form-horizontal\" novalidate=\"\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\" translate=\"First Name\"></label><input type=\"text\" required=\"\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"credentials.firstName\" placeholder=\"{{'First Name' | translate}}\"></div><div class=\"form-group\"><label for=\"lastName\" translate=\"Last Name\"></label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"credentials.lastName\" placeholder=\"{{'Last Name' | translate}}\"></div><div class=\"form-group\"><label for=\"email\" translate=\"Email\"></label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"credentials.email\" placeholder=\"{{'Email' | translate}}\"></div><div class=\"form-group\"><label for=\"username\" translate=\"Username\"></label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"form-group\"><label for=\"password\" translate=\"Password\"></label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"{{'Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\"><span translate=\"Sign up\"></span></button>&nbsp;<label translate=\"or\"></label>&nbsp; <a href=\"/#!/signin\" class=\"show-signup\" translate=\"Sign In\"></a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/forgot-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\" translate=\"Restore your password\"></h3><p class=\"small text-center\" translate=\"Enter your account username.\"></p><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"askForPasswordReset()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\"><span translate=\"Submit\"></span></button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-invalid.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\" translate=\"Password reset is invalid\"></h3><a href=\"/#!/password/forgot\" class=\"col-md-12\" translate=\"Ask for a new password reset\"></a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password-success.client.view.html",
    "<section class=\"row text-center\"><h3 class=\"col-md-12\" translate=\"Password successfully reset\"></h3><a href=\"/#!/\" class=\"col-md-12\" translate=\"Continue to home page\"></a></section>"
  );

  $templateCache.put("modules/users/views/password/reset-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"PasswordController\"><h3 class=\"col-md-12 text-center\" translate=\"Reset your password\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"resetUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"newPassword\" translate=\"New Password\"></label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"{{'New Password' | translate}}\"></div><div class=\"form-group\"><label for=\"verifyPassword\" translate=\"Verify Password\"></label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"{{'Verify Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\"><label translate=\"Update Password\"></label></button></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong>{{error}}</strong></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>{{success}}</strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/change-password.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" translate=\"Change your password\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"changeUserPassword()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"currentPassword\" translate=\"Current Password\"></label><input type=\"password\" id=\"currentPassword\" name=\"currentPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.currentPassword\" placeholder=\"{{'Current Password' | translate}}\"></div><div class=\"form-group\"><label for=\"newPassword\" translate=\"New Password\"></label><input type=\"password\" id=\"newPassword\" name=\"newPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.newPassword\" placeholder=\"{{'New Password' | translate}}\"></div><div class=\"form-group\"><label for=\"verifyPassword\" translate=\"Verify Password\"></label><input type=\"password\" id=\"verifyPassword\" name=\"verifyPassword\" class=\"form-control\" data-ng-model=\"passwordDetails.verifyPassword\" placeholder=\"{{'Verify Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\"><label translate=\"Save Password\"></label></button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong><label translate=\"Password Changed Successfully\"></label></strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/edit-profile.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" translate=\"Edit your profile\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"updateUserProfile(userForm.$valid)\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\" translate=\"First Name\"></label><input type=\"text\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"user.firstName\" placeholder=\"{{'First Name' | translate}}\"></div><div class=\"form-group\"><label for=\"lastName\" translate=\"Last Name\"></label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"user.lastName\" placeholder=\"{{'Last Name' | translate}}\"></div><div class=\"form-group\"><label for=\"email\" translate=\"Email\"></label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"user.email\" placeholder=\"{{'Email' | translate}}\"></div><div class=\"form-group\"><label for=\"username\" translate=\"Username\"></label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"user.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\"><label translate=\"Save Profile\"></label></button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Profile Saved Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" data-ng-show=\"hasConnectedAdditionalSocialAccounts()\">Connected social accounts:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=\"remove-account-container\"><img ng-src=\"/modules/users/img/buttons/{{providerName}}.png\"> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=\"removeUserSocialAccount(providerName)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\" translate=\"Connect other social accounts:\"></h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" data-ng-hide=\"isConnectedSocialAccount('google')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" data-ng-hide=\"isConnectedSocialAccount('github')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div></section>"
  );

}]);
