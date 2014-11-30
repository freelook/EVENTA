angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a data-ng-href=\"#!/\" class=\"navbar-brand\">EVENTA</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span translate=\"{{item.title}}\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a data-ng-href=\"#!/{{subitem.link}}\" translate=\"{{subitem.title}}\"></a></li></ul><a ng-switch-default=\"\" data-ng-href=\"#!/{{item.link}}\" translate=\"{{item.title}}\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a data-ng-href=\"#!/signup\" translate=\"Sign Up\"></a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a data-ng-href=\"#!/signin\" translate=\"Sign In\"></a></li><li class=\"divider-vertical\"></li><li><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" style=\"margin-top: 13px;margin-left: 10px\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a data-ng-href=\"#!/settings/profile\" translate=\"Edit Profile\"></a></li><li><a data-ng-href=\"#!/settings/accounts\" translate=\"Manage Social Accounts\"></a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a data-ng-href=\"#!/settings/password\" translate=\"Change Password\"></a></li><li class=\"divider\"></li><li><a data-ng-href=\"/auth/signout\" translate=\"Signout\"></a></li></ul></li><li class=\"dropdown\"><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" class=\"form-control header__language\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/home.client.view.html",
    "<section id=\"schedule\" class=\"schedule\" ng-controller=\"HomeController\"><div class=\"content-wrapper\"><div ng-repeat=\"day in days\" class=\"schedule-table col-lg-8 col-md-10 col-md-offset-1\"><h4 class=\"schedule-table-heading\">{{day.dateReadable}}</h4><div class=\"timeslot track-header stick-header\"><div class=\"track-header-label\"><label translate=\"Day\"></label>{{day.$index}}</div><div class=\"timeslot-elements flexbox-wrapper\"><div ng-repeat=\"track in day.tracks\" class=\"track-header-slot col-md-{{12/day.tracks.length}} flexbox-item-height hidden-xs\"><h5 class=\"track-header-title\">{{track.title}}</h5></div><div class=\"track-header-slot col-xs-12 visible-xs\"><h5 class=\"slot-detail track-header-title\"></h5></div></div></div><div ng-repeat=\"timeslot in day.timeslots\" class=\"timeslot\" itemtype=\"http://schema.org/subEvent\"><div class=\"timeslot-label\"><time class=\"start-time\" itemprop=\"startDate\" datetime=\"{{day.dateReadable}}T{{timeslot.startTime}}\"><span>{{timeslot.startTime}}</span></time> <time class=\"end-time\" itemprop=\"endDate\" datetime=\"{{day.dateReadable}}T{{timeslot.endTime}}\"><span>{{timeslot.endTime}}</span></time></div></div></div></div></section>"
  );

  $templateCache.put("modules/events/views/create-event.client.view.html",
    "<section data-ng-controller=\"EventsController\"><div class=\"page-header\"><h1 translate=\"Add new event\"></h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\" translate=\"Title\"></label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"{{'Title of future event' | translate}}\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\" translate=\"Short Description\"></label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"{{'Add short description here' | translate}}\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__box2\"><div class=\"controls edit-event__checkbox\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"></div><label class=\"control-label edit-event__checkbox__label\" for=\"external\" translate=\"External event\"></label></div><div class=\"form-group col-sm-5 edit-event__box2\"><label class=\"control-label\" for=\"backgroundImgUrl\" translate=\"Add Background Image\"></label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" translate=\"Start Date\"></label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtStart\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\" translate=\"Start Time\"></label><div class=\"controls\"><timepicker ng-model=\"startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" for=\"endDate\" translate=\"End Date\"></label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtEnd\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\" translate=\"End Time\"></label><div class=\"controls\"><timepicker ng-model=\"endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"numberOfPersons\" translate=\"Number of participants\"></label><div class=\"controls col-sm-5\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\" value=\"0\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"content\" translate=\"Long description\"></label><div class=\"controls col-sm-10\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"{{'Tell more about your future event' | translate}}\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" translate=\"Location\"></label><div class=\"controls col-sm-5\"><select class=\"form-control\" ng-model=\"selectedLocation\" ng-change=\"locationUpdate()\" ng-options=\"location.name group by location.group for location in locations\"></select></div></div><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" options=\"options\"><ui-gmap-marker coords=\"marker.coordinates\" options=\"marker.options\" idkey=\"marker.id\"></ui-gmap-marker></ui-gmap-google-map><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\" translate=\"Tags\"></label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"{{'Keywords of your event' | translate}}\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><input type=\"submit\" class=\"btn btn-default\"></div></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/edit-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 translate=\"Edit Event\"></h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\" novalidate=\"\"><fieldset><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title of future event\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\">Short Description</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short description here\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__box2\"><div class=\"controls edit-event__checkbox\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"event.external\"></div><label class=\"control-label edit-event__checkbox__label\" for=\"external\">External event</label></div><div class=\"form-group col-sm-5 edit-event__box2\"><label class=\"control-label\" for=\"backgroundImgUrl\">Add Background Image</label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div></div><div class=\"row\"><div class=\"col-sm-2\"></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\">Start Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"event.dtStart\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\">Start Time</label><div class=\"controls\"><timepicker ng-model=\"event.startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div><div class=\"form-group col-sm-5 edit-event__date\"><label class=\"control-label\" for=\"endDate\">End Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control edit-event__date__input\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"event.dtEnd\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"edit-event__time\"><label class=\"control-label\">End Time</label><div class=\"controls\"><timepicker ng-model=\"event.endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"numberOfPersons\">Number of participants</label><div class=\"controls col-sm-5\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"event.numberOfPersons\" type=\"number\" value=\"0\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"content\">Long description</label><div class=\"controls col-sm-10\"><textarea name=\"content\" data-ng-model=\"event.content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Tell more about your future event\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\">Location</label><div class=\"controls col-sm-5\"><select class=\"form-control\" ng-model=\"event.selectedLocation\" ng-options=\"location.name group by location.group for location in locations\"></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\">Tags</label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"event.tags\" placeholder=\"Keywords of your event\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><input type=\"submit\" class=\"btn btn-default\" value=\"Update\"></div></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/list-events.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Find event for you' | translate}}\" ng-model=\"search\"></md-text-float></div><div><button ng-if=\"!isFilterVisible\" ng-click=\"toggleFilterVisibility()\">Show Advanced Filter</button> <button ng-if=\"isFilterVisible\" ng-click=\"toggleFilterVisibility()\">Hide Advanced Filter</button><div ng-show=\"isFilterVisible\"><div><label>Filter by Tags:<input type=\"text\" ng-model=\"tagName\"></label></div></div></div><div class=\"list-group\"><a data-ng-repeat=\"event in events | filter : search | tagSearch : tagName | orderBy: 'startDate'\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item events-list__item\"><img ng-src=\"images/event_thumbnail.png\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"event.title\"></h4><p class=\"list-group-item-text event-list__item__text\" data-ng-bind=\"event.description\"></p><p class=\"list-group-item-text event-list__item__text\"><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><br><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></p><p class=\"list-group-item-text event-list__item__text\"><label>Tags: {{showTags(event)}}</label><br></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"events.$resolved && !events.length\"><label translate=\"No events yet, why don't you \"></label><a href=\"/#!/events/create\"><label traslate=\"create one\"></label></a>?</div></section>"
  );

  $templateCache.put("modules/events/views/view-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><div class=\"container event__background\"><div class=\"container event__filter\"></div><img class=\"container\" ng-if=\"!!event.backgroundImgUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{event.backgroundImgUrl.base64}}\"> <img class=\"container\" ng-if=\"!event.backgroundImgUrl.base64\" data-ng-src=\"/modules/core/img/header/slider-bg.jpg\"></div><h1 class=\"event__header\" data-ng-bind=\"event.title\"></h1><div class=\"event__time\"><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><span style=\"padding-left: 5px;padding-right: 5px\">-</span><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></div><button role=\"button\" class=\"btn btn-primary\">+ I will atend this event</button><div class=\"pull-right\"><a class=\"btn btn-primary event__button\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary event__button\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><p class=\"lead\" data-ng-bind=\"event.description\"></p><h2 class=\"event__subheader\">Event location</h2><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\" options=\"options\"><ui-gmap-marker coords=\"marker.coordinates\" options=\"marker.options\" idkey=\"marker.id\"></ui-gmap-marker></ui-gmap-google-map><h2 class=\"event__subheader\">More about event</h2><span data-ng-bind=\"event.content\"></span><div><div class=\"container event-participants\"><div lclass=\"\"><span class=\"control-label\" translate=\"Number of participants\"></span> - <span class=\"event__number\" data-ng-bind=\"event.numberOfPersons\"></span></div><button role=\"button\" class=\"btn btn-primary\">+ I will atend this event</button></div></div></section>"
  );

  $templateCache.put("modules/speakers/views/create-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\"><div class=\"page-header\"><h1>Add new speaker</h1></div><div class=\"col-md-12\"><form name=\"speakerForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.name.$dirty && speakerForm.name.$invalid }\"><label class=\"control-label col-sm-2\" for=\"name\">Name</label><div class=\"controls col-sm-10\"><input name=\"name\" type=\"text\" data-ng-model=\"name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.surname.$dirty && speakerForm.surname.$invalid }\"><label class=\"control-label col-sm-2\" for=\"surname\">Surname</label><div class=\"controls col-sm-10\"><input name=\"surname\" type=\"text\" data-ng-model=\"surname\" id=\"surname\" class=\"form-control\" placeholder=\"Surname\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.title.$dirty && speakerForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.company.$dirty && speakerForm.company.$invalid }\"><label class=\"control-label col-sm-2\" for=\"company\">Company</label><div class=\"controls col-sm-10\"><input name=\"company\" type=\"text\" data-ng-model=\"company\" id=\"company\" class=\"form-control\" placeholder=\"Company\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': speakerForm.bio.$dirty && speakerForm.bio.$invalid }\"><label class=\"control-label col-sm-2\" for=\"bio\">Short biography</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"bio\" data-ng-model=\"bio\" id=\"bio\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short bio here\" required=\"\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"thumbnailUrl\">Speaker's Photo</label><div class=\"controls\"><input type=\"file\" id=\"thumbnailUrl\" ng-model=\"thumbnailUrl\" base-sixty-four-input=\"\"></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/speakers/views/edit-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Speaker</h1></div><div class=\"col-md-12\"><form name=\"speakerForm\" class=\"form-horizontal\" data-ng-submit=\"update(speakerForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.name.$invalid}\"><label class=\"control-label\" for=\"name\">Name</label><div class=\"controls\"><input name=\"name\" type=\"text\" data-ng-model=\"speaker.name\" id=\"name\" class=\"form-control\" placeholder=\"Name\" required=\"\"></div><div ng-show=\"submitted && speakerForm.name.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.name.$error.required\" class=\"text-danger\">Name is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.surname.$invalid}\"><label class=\"control-label\" for=\"surname\">Surame</label><div class=\"controls\"><input name=\"surname\" type=\"text\" data-ng-model=\"speaker.surname\" id=\"surname\" class=\"form-control\" placeholder=\"Surname\" required=\"\"></div><div ng-show=\"submitted && speakerForm.surname.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.surname.$error.required\" class=\"text-danger\">Surname is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && speakerForm.bio.$invalid}\"><label class=\"control-label\" for=\"bio\">Bio</label><div class=\"controls\"><textarea name=\"bio\" data-ng-model=\"speaker.bio\" id=\"bio\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Bio cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && speakerForm.bio.$invalid\" class=\"help-block\"><p ng-show=\"speakerForm.bio.$error.required\" class=\"text-danger\">Bio cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/speakers/views/list-speakers.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Hall of fame' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"speaker in speakers | filter:search\" data-ng-href=\"#!/speakers/{{speaker._id}}\" class=\"list-group-item speakers-list__item\" flex=\"45\" flex-order=\"{{$index % 2}}\"><img data-ng-src=\"data:image/jpg;base64,{{speaker.thumbnailUrl.base64}}\"><p>{{speaker._id}}</p><h2>{{speaker.name + '&nbsp;' + speaker.surname}}</h2><h3>{{speaker.company}}</h3><h4>{{speaker.title}}</h4><p data-ng-bind-html=\"speaker.bio\"></p></a></div></section>"
  );

  $templateCache.put("modules/speakers/views/view-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>{{speaker.name + '&nbsp;' + speaker.surname}}</h1></div><p>{{speakers}}</p><div class=\"pull-right\"><a class=\"btn btn-primary\" href=\"/#!/speakers/{{speaker._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><p><img ng-if=\"!!speaker.thumbnailUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{speaker.thumbnailUrl.base64}}\"></p><p class=\"lead\" data-ng-bind=\"speaker.bio\"></p></section>"
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

  $templateCache.put("modules/users/views/users.client.view.html",
    "<section data-ng-controller=\"UsersController\" data-ng-init=\"find()\"><div class=\"list-group\"><a data-ng-repeat=\"user in users\" data-ng-href=\"#!/user/{{user._id}}\" class=\"list-group-item events-list__item\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"user.username\"></h4></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"users.$resolved && !users.length\"><label>No users yet</label></div></section>"
  );

}]);
