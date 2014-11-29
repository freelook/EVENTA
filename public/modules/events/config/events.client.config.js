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
