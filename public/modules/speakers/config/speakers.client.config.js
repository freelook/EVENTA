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
