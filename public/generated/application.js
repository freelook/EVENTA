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

angular.module('events').controller('EventsController',
	["$scope", "$stateParams", "$location", "$filter", "Authentication", "Events", "EventSettings", function($scope, $stateParams, $location, $filter, Authentication, Events, EventSettings) {
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
	}]
);

'use strict';

angular.module('events').factory('EventSettings',
    ["$filter", function($filter) {

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

        return {
            dateFormat: getDateFormat,
            formatDate: formatDate,
            getProperDate: getProperDate,
            trimSplitTags: trimSplitTags
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
    "<section data-ng-controller=\"EventsController\"><div class=\"page-header\"><h1>Add new event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title of future event\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\">Short Description</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short description here\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"form-group col-sm-10\"><div class=\"controls col-sm-2\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"></div><label class=\"control-label col-sm-10\" for=\"external\">External event</label></div></div><div class=\"form-group\"><label class=\"control-label\">Start Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"startDate\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><label class=\"control-label\">Start Time</label><div class=\"controls\"><timepicker ng-model=\"startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"endDate\">End Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"endDate\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"form-group\"><label class=\"control-label\" for=\"backgroundImgUrl\">Background Image</label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div><label class=\"control-label\">End Time</label><div class=\"controls\"><timepicker ng-model=\"endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div><div class=\"form-group col-sm-4\"><label class=\"control-label\" for=\"numberOfPersons\">Number of participants</label><div class=\"controls\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\" value=\"0\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Description cannot be blank\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\">Tags</label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"Keywords of your event\"></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/edit-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && eventForm.title.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.content.$invalid}\"><label class=\"control-label\" for=\"description\">Description</label><div class=\"controls\"><textarea name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Description cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && eventForm.content.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.content.$error.required\" class=\"text-danger\">Description cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/list-events.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Find event for you' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"event in events | filter:search\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item events-list__item\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"event.title\"></h4><p class=\"list-group-item-text event-list__item__text\" data-ng-bind=\"event.description\"></p><p class=\"list-group-item-text event-list__item__text\"><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><br><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"events.$resolved && !events.length\">No events yet, why don't you <a href=\"/#!/events/create\">create one</a>?</div></section>"
  );

  $templateCache.put("modules/events/views/view-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 data-ng-bind=\"event.title\"></h1></div><div class=\"pull-right\"><a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"event.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"event.user.displayName\"></span></em></small><p><img ng-if=\"!!event.backgroundImgUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{event.backgroundImgUrl.base64}}\"></p><p class=\"lead\" data-ng-bind=\"event.description\"></p></section>"
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
