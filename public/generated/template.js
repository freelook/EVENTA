angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/#!/\" class=\"navbar-brand\">EVENTA</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span translate=\"{{item.title}}\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/{{subitem.link}}\" translate=\"{{subitem.title}}\"></a></li></ul><a ng-switch-default=\"\" href=\"/#!/{{item.link}}\" translate=\"{{item.title}}\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signup\" translate=\"Sign Up\"></a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signin\" translate=\"Sign In\"></a></li><li class=\"divider-vertical\"></li><li><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" style=\"margin-top: 13px;margin-left: 10px\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"/#!/settings/profile\" translate=\"Edit Profile\"></a></li><li><a href=\"/#!/settings/accounts\" translate=\"Manage Social Accounts\"></a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a href=\"/#!/settings/password\" translate=\"Change Password\"></a></li><li class=\"divider\"></li><li><a href=\"/auth/signout\" translate=\"Signout\"></a></li></ul></li><li class=\"dropdown\"><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" class=\"form-control header__language\"><option ng-selected=\"lang === 'ru'\">RU</option><option ng-selected=\"lang === 'en'\">EN</option></select></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/home.client.view.html",
    "<section id=\"schedule\" class=\"schedule\" ng-controller=\"HomeController\"><div class=\"content-wrapper\"><div ng-repeat=\"day in days\" class=\"schedule-table col-lg-8 col-md-10 col-md-offset-1\"><h4 class=\"schedule-table-heading\">{{day.dateReadable}}</h4><div class=\"timeslot track-header stick-header\"><div class=\"track-header-label\"><label translate=\"Day\"></label>{{day.$index}}</div><div class=\"timeslot-elements flexbox-wrapper\"><div ng-repeat=\"track in day.tracks\" class=\"track-header-slot col-md-{{12/day.tracks.length}} flexbox-item-height hidden-xs\"><h5 class=\"track-header-title\">{{track.title}}</h5></div><div class=\"track-header-slot col-xs-12 visible-xs\"><h5 class=\"slot-detail track-header-title\"></h5></div></div></div><div ng-repeat=\"timeslot in day.timeslots\" class=\"timeslot\" itemtype=\"http://schema.org/subEvent\"><div class=\"timeslot-label\"><time class=\"start-time\" itemprop=\"startDate\" datetime=\"{{day.dateReadable}}T{{timeslot.startTime}}\"><span>{{timeslot.startTime}}</span></time> <time class=\"end-time\" itemprop=\"endDate\" datetime=\"{{day.dateReadable}}T{{timeslot.endTime}}\"><span>{{timeslot.endTime}}</span></time></div></div></div></div></section>"
  );

  $templateCache.put("modules/events/views/create-event.client.view.html",
    "<section data-ng-controller=\"EventsController\">\r" +
    "\n" +
    "<<<<<<< HEAD\r" +
    "\n" +
    "\t<div class=\"page-header\">\r" +
    "\n" +
    "\t\t<h1>Add new event</h1>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"col-md-12\">\r" +
    "\n" +
    "\t\t<form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate>\r" +
    "\n" +
    "\t\t\t<fieldset>\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label col-sm-2\" for=\"title\">Title</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls col-sm-10\">\r" +
    "\n" +
    "\t\t\t\t\t\t<input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title of future event\" required>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label col-sm-2\" for=\"description\">Short Description</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls col-sm-10\">\r" +
    "\n" +
    "\t\t\t\t\t\t<textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short description here\" required></textarea>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"row\">\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"form-group col-sm-10\">\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"controls col-sm-2\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"external\" data-ng-model=\"external\" />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<label class=\"control-label col-sm-10\" for=\"external\">External event</label>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label\">Start Date</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   id=\"startDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   is-open=\"startOpened \"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   ng-required=\"true\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   close-text=\"Close\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   max-date=\"maxDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   min-date=\"minDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   datepicker-options=\"dateOptions\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   ng-model=\"dtStart\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   datepicker-popup=\"{{format}}\" />\r" +
    "\n" +
    "\t\t\t\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "                \t\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "              </span>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "                    <label class=\"control-label\">Start Time</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "                        <timepicker ng-model=\"startTime\"\r" +
    "\n" +
    "                                    hour-step=\"hstep\"\r" +
    "\n" +
    "                                    minute-step=\"mstep\"\r" +
    "\n" +
    "                                    show-meridian=\"false\"></timepicker>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"endDate\">End Date</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   id=\"endDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   is-open=\"endOpened \"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   ng-required=\"true\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   close-text=\"Close\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   max-date=\"maxDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   min-date=\"minDate\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   datepicker-options=\"dateOptions\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   ng-model=\"dtEnd\"\r" +
    "\n" +
    "\t\t\t\t\t\t\t   datepicker-popup=\"{{format}}\" />\r" +
    "\n" +
    "\t\t\t\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "                \t\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "\t\t\t\t\t\t</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t\t<label class=\"control-label\" for=\"backgroundImgUrl\">Background Image</label>\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<input type=\"file\" id=\"backgroundImgUrl\" ng-model='backgroundImgUrl' base-sixty-four-input>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "                    \r" +
    "\n" +
    "                    <label class=\"control-label\">End Time</label>\r" +
    "\n" +
    "=======\r" +
    "\n" +
    "    <div class=\"page-header\">\r" +
    "\n" +
    "        <h1>Add new event</h1>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-12\">\r" +
    "\n" +
    "        <form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate>\r" +
    "\n" +
    "            <fieldset>\r" +
    "\n" +
    "                <div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\" for=\"title\">Title</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-10\">\r" +
    "\n" +
    "                        <input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\"\r" +
    "\n" +
    "                               placeholder=\"Title of future event\" required>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\"\r" +
    "\n" +
    "                     ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\" for=\"description\">Short Description</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-10\">\r" +
    "\n" +
    "                        <textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\"\r" +
    "\n" +
    "                                  class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\"\r" +
    "\n" +
    "                                  placeholder=\"Add short description here\" required></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-sm-2\"></div>\r" +
    "\n" +
    "                    <div class=\"form-group col-sm-5 edit-event__box2\">\r" +
    "\n" +
    "                          <div class=\"controls edit-event__checkbox\">\r" +
    "\n" +
    "                              <input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"/>\r" +
    "\n" +
    "                          </div>\r" +
    "\n" +
    "                          <label class=\"control-label edit-event__checkbox__label\" for=\"external\">External event</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                  <div class=\"form-group col-sm-5 edit-event__box2\">\r" +
    "\n" +
    "                      <label class=\"control-label\" for=\"backgroundImgUrl\">Add Background Image</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                      <div class=\"controls\">\r" +
    "\n" +
    "                          <input type=\"file\" id=\"backgroundImgUrl\" ng-model='backgroundImgUrl' base-sixty-four-input>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                  <div class=\"col-sm-2\"></div>\r" +
    "\n" +
    "                  <div class=\"form-group col-sm-5 edit-event__date\">\r" +
    "\n" +
    "                      <label class=\"control-label\">Start Date</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                      <div class=\"controls\">\r" +
    "\n" +
    "                          <input type=\"text\" class=\"form-control edit-event__date__input\"\r" +
    "\n" +
    "                                 id=\"startDate\"\r" +
    "\n" +
    "                                 is-open=\"startOpened \"\r" +
    "\n" +
    "                                 ng-required=\"true\"\r" +
    "\n" +
    "                                 close-text=\"Close\"\r" +
    "\n" +
    "                                 max-date=\"maxDate\"\r" +
    "\n" +
    "                                 min-date=\"minDate\"\r" +
    "\n" +
    "                                 datepicker-options=\"dateOptions\"\r" +
    "\n" +
    "                                 ng-model=\"dtStart\"\r" +
    "\n" +
    "                                 datepicker-popup=\"{{format}}\"/>\r" +
    "\n" +
    "  \t\t\t\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "                  \t\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i\r" +
    "\n" +
    "                                      class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                      <div class=\"edit-event__time\">\r" +
    "\n" +
    "                        <label class=\"control-label\">Start Time</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"controls\">\r" +
    "\n" +
    "                            <timepicker ng-model=\"startTime\"\r" +
    "\n" +
    "                                        hour-step=\"hstep\"\r" +
    "\n" +
    "                                        minute-step=\"mstep\"\r" +
    "\n" +
    "                                        show-meridian=\"false\"></timepicker>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "                  <div class=\"form-group col-sm-5 edit-event__date\">\r" +
    "\n" +
    "                      <label class=\"control-label\" for=\"endDate\">End Date</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                      <div class=\"controls\">\r" +
    "\n" +
    "                          <input type=\"text\" class=\"form-control edit-event__date__input\"\r" +
    "\n" +
    "                                 id=\"endDate\"\r" +
    "\n" +
    "                                 is-open=\"endOpened \"\r" +
    "\n" +
    "                                 ng-required=\"true\"\r" +
    "\n" +
    "                                 close-text=\"Close\"\r" +
    "\n" +
    "                                 max-date=\"maxDate\"\r" +
    "\n" +
    "                                 min-date=\"minDate\"\r" +
    "\n" +
    "                                 datepicker-options=\"dateOptions\"\r" +
    "\n" +
    "                                 ng-model=\"dtEnd\"\r" +
    "\n" +
    "                                 datepicker-popup=\"{{format}}\"/>\r" +
    "\n" +
    "  \t\t\t\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "                  \t\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i\r" +
    "\n" +
    "                                      class=\"glyphicon glyphicon-calendar\"></i></button>\r" +
    "\n" +
    "  \t\t\t\t\t\t</span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                      <div class=\"edit-event__time\">\r" +
    "\n" +
    "                        <label class=\"control-label\">End Time</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <div class=\"controls\">\r" +
    "\n" +
    "                            <timepicker ng-model=\"endTime\"\r" +
    "\n" +
    "                                        hour-step=\"hstep\"\r" +
    "\n" +
    "                                        minute-step=\"mstep\"\r" +
    "\n" +
    "                                        show-meridian=\"false\"></timepicker>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\" for=\"numberOfPersons\">Number of participants</label>\r" +
    "\n" +
    ">>>>>>> 6bc2cb75d926f127cb25beef3ca789d77998e006\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-5\">\r" +
    "\n" +
    "                        <input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\" value=\"0\"/>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<<<<<<< HEAD\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"form-group col-sm-4\">\r" +
    "\n" +
    "\t\t\t\t\t\t<label class=\"control-label\" for=\"numberOfPersons\">Number of participants</label>\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label\" for=\"content\">Content</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls\">\r" +
    "\n" +
    "\t\t\t\t\t\t<textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Description cannot be blank\"></textarea>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t<label class=\"control-label col-sm-2\" for=\"tags\">Tags</label>\r" +
    "\n" +
    "\t\t\t\t\t<div class=\"controls col-sm-10\">\r" +
    "\n" +
    "\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"Keywords of your event\"/>\r" +
    "\n" +
    "\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t<input type=\"submit\" class=\"btn btn-default\">\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t<div data-ng-show=\"error\" class=\"text-danger\">\r" +
    "\n" +
    "\t\t\t\t\t<strong data-ng-bind=\"error\"></strong>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</fieldset>\r" +
    "\n" +
    "\t\t</form>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "=======\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\" for=\"content\">Long description</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-10\">\r" +
    "\n" +
    "                        <textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\"\r" +
    "\n" +
    "                                  rows=\"10\" placeholder=\"Tell more about your future event\"></textarea>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\">Location</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-5\">\r" +
    "\n" +
    "                        <select class=\"form-control\" ng-model=\"selectedLocation\" ng-options=\"location.name group by location.group for location in locations\"></select>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"control-label col-sm-2\" for=\"tags\">Tags</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"controls col-sm-10\">\r" +
    "\n" +
    "                        <input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\"\r" +
    "\n" +
    "                               placeholder=\"Keywords of your event\"/>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <div class=\"col-sm-offset-2 col-sm-10\">\r" +
    "\n" +
    "                      <input type=\"submit\" class=\"btn btn-default\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div data-ng-show=\"error\" class=\"text-danger\">\r" +
    "\n" +
    "                    <strong data-ng-bind=\"error\"></strong>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </fieldset>\r" +
    "\n" +
    "        </form>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    ">>>>>>> 6bc2cb75d926f127cb25beef3ca789d77998e006\r" +
    "\n" +
    "</section>\r" +
    "\n"
  );

  $templateCache.put("modules/events/views/edit-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && eventForm.title.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.content.$invalid}\"><label class=\"control-label\" for=\"description\">Description</label><div class=\"controls\"><textarea name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Description cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && eventForm.content.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.content.$error.required\" class=\"text-danger\">Description cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/list-events.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Find event for you' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"event in events | filter:search\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item events-list__item\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"event.title\"></h4><p class=\"list-group-item-text event-list__item__text\" data-ng-bind=\"event.description\"></p><p class=\"list-group-item-text event-list__item__text\"><label>Start: {{event.startDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label><br><label>End: {{event.endDate | date:'d MMMM yyyy, hh:mm' : 'UTC' }}</label></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"events.$resolved && !events.length\">No events yet, why don't you <a href=\"/#!/events/create\">create one</a>?</div></section>"
  );

  $templateCache.put("modules/events/views/view-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><div class=\"event__background\"><img ng-if=\"!!event.backgroundImgUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{event.backgroundImgUrl.base64}}\"></div><h1 data-ng-bind=\"event.title\"></h1></div><div class=\"pull-right\"><a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"event.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"event.user.displayName\"></span></em></small><p></p><p class=\"lead\" data-ng-bind=\"event.description\"></p><ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\"><ui-gmap-marker coords=\"map.center\" options=\"marker.options\" idkey=\"marker.id\"></ui-gmap-marker></ui-gmap-google-map></section>"
  );

  $templateCache.put("modules/speakers/views/create-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\"><div class=\"page-header\"><h1>Add new event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" role=\"form\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label col-sm-2\" for=\"title\">Title</label><div class=\"controls col-sm-10\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title of future event\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label col-sm-2\" for=\"description\">Short Description</label><div class=\"controls col-sm-10\"><textarea type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control col-sm-12\" cols=\"20\" rows=\"5\" placeholder=\"Add short description here\" required=\"\"></textarea></div></div><div class=\"row\"><div class=\"form-group col-sm-10\"><div class=\"controls col-sm-2\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"></div><label class=\"control-label col-sm-10\" for=\"external\">External event</label></div></div><div class=\"form-group\"><label class=\"control-label\">Start Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control\" id=\"startDate\" is-open=\"startOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtStart\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openStartDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><label class=\"control-label\">Start Time</label><div class=\"controls\"><timepicker ng-model=\"startTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"endDate\">End Date</label><div class=\"controls\"><input type=\"text\" class=\"form-control\" id=\"endDate\" is-open=\"endOpened \" ng-required=\"true\" close-text=\"Close\" max-date=\"maxDate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" ng-model=\"dtEnd\" datepicker-popup=\"{{format}}\"><span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"openEndDate($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></div><div class=\"form-group\"><label class=\"control-label\" for=\"backgroundImgUrl\">Background Image</label><div class=\"controls\"><input type=\"file\" id=\"backgroundImgUrl\" ng-model=\"backgroundImgUrl\" base-sixty-four-input=\"\"></div></div><label class=\"control-label\">End Time</label><div class=\"controls\"><timepicker ng-model=\"endTime\" hour-step=\"hstep\" minute-step=\"mstep\" show-meridian=\"false\"></timepicker></div></div><div class=\"form-group col-sm-4\"><label class=\"control-label\" for=\"numberOfPersons\">Number of participants</label><div class=\"controls\"><input class=\"form-control\" id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\"></div></div></fieldset></form></div><div class=\"form-group\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Description cannot be blank\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label col-sm-2\" for=\"tags\">Tags</label><div class=\"controls col-sm-10\"><input class=\"form-control\" type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"Keywords of your event\"></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></section>"
  );

  $templateCache.put("modules/speakers/views/edit-speaker.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && eventForm.title.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.content.$invalid}\"><label class=\"control-label\" for=\"description\">Description</label><div class=\"controls\"><textarea name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Description cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && eventForm.content.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.content.$error.required\" class=\"text-danger\">Description cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/speakers/views/list-speakers.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"find()\"><div class=\"events__header\"><md-text-float label=\"{{ 'Hall of fame' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"speaker in speakers | filter:search\" data-ng-href=\"#!/speakers/{{speaker._id}}\" class=\"list-group-item speakers-list__item\" flex=\"45\" flex-order=\"{{$index % 2}}\"><h2>{{speaker.name + '&nbsp;' + speaker.surname}}</h2><h3>{{speaker.company}}</h3><h4>{{speaker.title}}</h4><p data-ng-bind-html=\"speaker.bio\"></p></a></div></section>"
  );

  $templateCache.put("modules/speakers/views/view-speakers.client.view.html",
    "<section data-ng-controller=\"SpeakersController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 data-ng-bind=\"event.title\"></h1></div><div class=\"pull-right\"><a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"event.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"event.user.displayName\"></span></em></small><p><img ng-if=\"!!event.backgroundImgUrl.base64\" data-ng-src=\"data:image/jpg;base64,{{event.backgroundImgUrl.base64}}\"></p><p class=\"lead\" data-ng-bind=\"event.description\"></p></section>"
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
