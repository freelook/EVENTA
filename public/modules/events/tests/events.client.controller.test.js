'use strict';

(function() {
	// Events Controller Spec
	describe('EventsController', function() {
		// Initialize global variables
		var EventsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			$httpBackend.expectGET().respond({});
			// Initialize the Events controller.
			EventsController = $controller('EventsController', {
				$scope: scope
			});
		}));

			xit('$scope.find() should create an array with at least one event object fetched from XHR', inject(function (Events) {
				// Create sample event using the Events service
				var sampleEvent = new Events({
					title: 'An Event about MEAN',
					content: 'MEAN rocks!'
				});

				// Create a sample events array that includes the new event
				var sampleEvents = [sampleEvent];

				// Set GET response

				$httpBackend.when('GET', 'events').respond(sampleEvents);
				$httpBackend.expectGET('/i18n/resources-locale_ru.json').respond({});
				// Run controller functionality
				scope.find();
				$httpBackend.flush();

				// Test scope value
				expect(scope.events).toEqualData(sampleEvents);
			}));

		it('$scope.findOne() should create an array with one event object fetched from XHR using a eventId URL parameter', inject(function(Events) {
			// Define a sample event object
			var sampleEvent = new Events({
				title: 'An Event about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.eventId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET('/i18n/resources-locale_ru.json').respond({});
			$httpBackend.expectGET(/events\/([0-9a-fA-F]{24})$/).respond(sampleEvent);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.event).toEqualData(sampleEvent);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Events) {
			// Create a sample event object
			var sampleEventPostData = new Events({
				title: 'An Event about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample event response
			var sampleEventResponse = new Events({
				_id: '525cf20451979dea2c000001',
				title: 'An Event about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Event about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('events', sampleEventPostData).respond(sampleEventResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the event was created
			expect($location.path()).toBe('/events/' + sampleEventResponse._id);
		}));

		it('$scope.update() should update a valid event', inject(function(Events) {
			// Define a sample event put data
			var sampleEventPutData = new Events({
				_id: '525cf20451979dea2c000001',
				title: 'An Event about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock event in scope
			scope.event = sampleEventPutData;

			// Set PUT response
			$httpBackend.expectPUT(/events\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/events/' + sampleEventPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid eventId and remove the event from the scope', inject(function(Events) {
			// Create new event object
			var sampleEvent = new Events({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new events array and include the event
			scope.events = [sampleEvent];

			// Set expected DELETE response

			$httpBackend.expectDELETE(/events\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEvent);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.events.length).toBe(0);
		}));

		afterEach(function () {
			$httpBackend.verifyNoOutstandingRequest();
		});
	});
}());
