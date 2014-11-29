angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("modules/core/views/header.client.view.html",
    "<div class=\"container\" data-ng-controller=\"HeaderController\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-ng-click=\"toggleCollapsibleMenu()\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a href=\"/#!/\" class=\"navbar-brand\">EVENTA</a></div><nav class=\"collapse navbar-collapse\" collapse=\"!isCollapsed\" role=\"navigation\"><ul class=\"nav navbar-nav\" data-ng-if=\"menu.shouldRender(authentication.user);\"><li data-ng-repeat=\"item in menu.items | orderBy: 'position'\" data-ng-if=\"item.shouldRender(authentication.user);\" ng-switch=\"item.menuItemType\" ui-route=\"{{item.uiRoute}}\" class=\"{{item.menuItemClass}}\" ng-class=\"{active: ($uiRoute)}\" dropdown=\"item.menuItemType === 'dropdown'\"><a ng-switch-when=\"dropdown\" class=\"dropdown-toggle\"><span data-ng-bind=\"item.title\"></span> <b class=\"caret\"></b></a><ul ng-switch-when=\"dropdown\" class=\"dropdown-menu\"><li data-ng-repeat=\"subitem in item.items | orderBy: 'position'\" data-ng-if=\"subitem.shouldRender(authentication.user);\" ui-route=\"{{subitem.uiRoute}}\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/{{subitem.link}}\" data-ng-bind=\"subitem.title\"></a></li></ul><a ng-switch-default=\"\" href=\"/#!/{{item.link}}\" data-ng-bind=\"item.title\"></a></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-hide=\"authentication.user\"><li ui-route=\"/signup\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signup\" translate=\"Sign Up\"></a></li><li class=\"divider-vertical\"></li><li ui-route=\"/signin\" ng-class=\"{active: $uiRoute}\"><a href=\"/#!/signin\" translate=\"Sign In\"></a></li><li class=\"divider-vertical\"></li><li><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" style=\"margin-top: 13px;margin-left: 10px\"><option ng-selected=\"lang === 'ru'\">ru</option><option ng-selected=\"lang === 'en'\">en</option></select></li></ul><ul class=\"nav navbar-nav navbar-right\" data-ng-show=\"authentication.user\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span data-ng-bind=\"authentication.user.displayName\"></span> <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"/#!/settings/profile\" translate=\"Edit Profile\"></a></li><li><a href=\"/#!/settings/accounts\" translate=\"Manage Social Accounts\"></a></li><li data-ng-show=\"authentication.user.provider === 'local'\"><a href=\"/#!/settings/password\" translate=\"Change Password\"></a></li><li class=\"divider\"></li><li><a href=\"/auth/signout\" translate=\"Signout\"></a></li></ul></li><li><select ng-controller=\"LangController\" data-ng-model=\"lang\" ng-change=\"setLang()\" style=\"margin-top: 13px;margin-left: 10px\"><option ng-selected=\"lang === 'ru'\">ru</option><option ng-selected=\"lang === 'en'\">en</option></select></li></ul></nav></div>"
  );

  $templateCache.put("modules/core/views/home.client.view.html",
    "<section id=\"schedule\" class=\"schedule\" ng-controller=\"HomeController\"><div class=\"content-wrapper\"><div ng-repeat=\"day in days\" class=\"schedule-table col-lg-8 col-md-10 col-md-offset-1\"><h4 class=\"schedule-table-heading\">{{day.dateReadable}}</h4><div class=\"timeslot track-header stick-header\"><div class=\"track-header-label\"><label translate=\"Day\"></label>{{day.$index}}</div><div class=\"timeslot-elements flexbox-wrapper\"><div ng-repeat=\"track in day.tracks\" class=\"track-header-slot col-md-{{12/day.tracks.length}} flexbox-item-height hidden-xs\"><h5 class=\"track-header-title\">{{track.title}}</h5></div><div class=\"track-header-slot col-xs-12 visible-xs\"><h5 class=\"slot-detail track-header-title\"></h5></div></div></div><div ng-repeat=\"timeslot in day.timeslots\" class=\"timeslot\" itemtype=\"http://schema.org/subEvent\"><div class=\"timeslot-label\"><time class=\"start-time\" itemprop=\"startDate\" datetime=\"{{day.dateReadable}}T{{timeslot.startTime}}\"><span>{{timeslot.startTime}}</span></time> <time class=\"end-time\" itemprop=\"endDate\" datetime=\"{{day.dateReadable}}T{{timeslot.endTime}}\"><span>{{timeslot.endTime}}</span></time></div></div></div></div></section>"
  );

  $templateCache.put("modules/events/views/create-event.client.view.html",
    "<section data-ng-controller=\"EventsController\"><div class=\"page-header\"><h1>New Event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" data-ng-submit=\"create()\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.title.$dirty && eventForm.title.$invalid }\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div></div><div class=\"form-group\" ng-class=\"{ 'has-error': eventForm.description.$dirty && eventForm.description.$invalid }\"><label class=\"control-label\" for=\"description\">Short Description</label><div class=\"controls\"><input type=\"text\" name=\"description\" data-ng-model=\"description\" id=\"description\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Description cannot be blank\" required=\"\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"external\">External</label><div class=\"controls\"><input type=\"checkbox\" id=\"external\" data-ng-model=\"external\"></div></div><div class=\"form-group\"><label class=\"control-label\">Start Date</label><div class=\"controls\"><input type=\"date\" id=\"startDateTime\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"endDate\">End Date</label><div class=\"controls\"><input type=\"date\" id=\"endDate\" data-ng-model=\"endDateTime\" required=\"\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"numberOfPersons\">Number of participants</label><div class=\"controls\"><input id=\"numberOfPersons\" data-ng-model=\"numberOfPersons\" type=\"number\"></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"content\">Content</label><div class=\"controls\"><textarea name=\"content\" data-ng-model=\"content\" id=\"content\" class=\"form-control\" cols=\"20\" rows=\"10\" placeholder=\"Description cannot be blank\"></textarea></div></div><div class=\"form-group\"><label class=\"control-label\" for=\"tags\">Tags</label><div class=\"controls\"><input type=\"text\" name=\"tags\" id=\"tags\" data-ng-model=\"tags\" placeholder=\"Content\"></div></div><div class=\"form-group\"><input type=\"submit\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/edit-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1>Edit Event</h1></div><div class=\"col-md-12\"><form name=\"eventForm\" class=\"form-horizontal\" data-ng-submit=\"update(eventForm.$valid)\" novalidate=\"\"><fieldset><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.title.$invalid}\"><label class=\"control-label\" for=\"title\">Title</label><div class=\"controls\"><input name=\"title\" type=\"text\" data-ng-model=\"event.title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required=\"\"></div><div ng-show=\"submitted && eventForm.title.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.title.$error.required\" class=\"text-danger\">Title is required</p></div></div><div class=\"form-group\" ng-class=\"{ 'has-error' : submitted && eventForm.content.$invalid}\"><label class=\"control-label\" for=\"description\">Description</label><div class=\"controls\"><textarea name=\"description\" data-ng-model=\"event.description\" id=\"description\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Description cannot be empty\" required=\"\"></textarea></div><div ng-show=\"submitted && eventForm.content.$invalid\" class=\"help-block\"><p ng-show=\"eventForm.content.$error.required\" class=\"text-danger\">Description cannot be empty</p></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Update\" class=\"btn btn-default\"></div><div data-ng-show=\"error\" class=\"text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/events/views/list-events.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"find()\"><div><md-text-float label=\"{{ 'Find event for you' | translate}}\" ng-model=\"search\"></md-text-float></div><div class=\"list-group\"><a data-ng-repeat=\"event in events\" data-ng-href=\"#!/events/{{event._id}}\" class=\"list-group-item events-list__item\"><h4 class=\"list-group-item-heading event-list__item__header\" data-ng-bind=\"event.title\"></h4><p class=\"list-group-item-text event-list__item__text\" data-ng-bind=\"event.content\"></p></a></div><div class=\"alert alert-warning text-center\" data-ng-if=\"events.$resolved && !events.length\">No events yet, why don't you <a href=\"/#!/events/create\">create one</a>?</div></section>"
  );

  $templateCache.put("modules/events/views/view-event.client.view.html",
    "<section data-ng-controller=\"EventsController\" data-ng-init=\"findOne()\"><div class=\"page-header\"><h1 data-ng-bind=\"event.title\"></h1></div><div class=\"pull-right\" data-ng-show=\"authentication.user._id == event.user._id\"><a class=\"btn btn-primary\" href=\"/#!/events/{{event._id}}/edit\"><i class=\"glyphicon glyphicon-edit\"></i></a> <a class=\"btn btn-primary\" data-ng-click=\"remove();\"><i class=\"glyphicon glyphicon-trash\"></i></a></div><small><em class=\"text-muted\">Posted on <span data-ng-bind=\"event.created | date:'mediumDate'\"></span> by <span data-ng-bind=\"event.user.displayName\"></span></em></small><p class=\"lead\" data-ng-bind=\"event.description\"></p></section>"
  );

  $templateCache.put("modules/users/views/authentication/signin.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\" translate=\"Sign in using your social accounts\"></h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\" translate=\"Or with your account\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form data-ng-submit=\"signin()\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"username\" translate=\"Username\"></label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"form-group\"><label for=\"password\" translate=\"Password\"></label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"{{'Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-primary\"><span translate=\"Sign In\"></span></button>&nbsp;<label translate=\"or\"></label>&nbsp; <a href=\"/#!/signup\" translate=\"Sign up\"></a></div><div class=\"forgot-password\"><a href=\"/#!/password/forgot\" translate=\"Forgot your password?\"></a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/authentication/signup.client.view.html",
    "<section class=\"row\" data-ng-controller=\"AuthenticationController\"><h3 class=\"col-md-12 text-center\" translate=\"Sign up using your social accounts\"></h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div><h3 class=\"col-md-12 text-center\" translate=\"Or with your email\"></h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"signup()\" class=\"signin form-horizontal\" novalidate=\"\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\" translate=\"First Name\"></label><input type=\"text\" required=\"\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"credentials.firstName\" placeholder=\"{{'First Name' | translate}}\"></div><div class=\"form-group\"><label for=\"lastName\" translate=\"Last Name\"></label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"credentials.lastName\" placeholder=\"{{'Last Name' | translate}}\"></div><div class=\"form-group\"><label for=\"email\" translate=\"Email\"></label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"credentials.email\" placeholder=\"{{'Email' | translate}}\"></div><div class=\"form-group\"><label for=\"username\" translate=\"Username\"></label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"credentials.username\" placeholder=\"{{'Username' | translate}}\"></div><div class=\"form-group\"><label for=\"password\" translate=\"Password\"></label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" data-ng-model=\"credentials.password\" placeholder=\"{{'Password' | translate}}\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\"><span translate=\"Sign up\"></span></button>&nbsp;<label translate=\"or\"></label>&nbsp; <a href=\"/#!/signin\" class=\"show-signup\" translate=\"Sign In\"></a></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
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
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\">Edit your profile</h3><div class=\"col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2\"><form name=\"userForm\" data-ng-submit=\"updateUserProfile(userForm.$valid)\" class=\"signin form-horizontal\" autocomplete=\"off\"><fieldset><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" id=\"firstName\" name=\"firstName\" class=\"form-control\" data-ng-model=\"user.firstName\" placeholder=\"First Name\"></div><div class=\"form-group\"><label for=\"lastName\">Last Name</label><input type=\"text\" id=\"lastName\" name=\"lastName\" class=\"form-control\" data-ng-model=\"user.lastName\" placeholder=\"Last Name\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" data-ng-model=\"user.email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"username\">Username</label><input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" data-ng-model=\"user.username\" placeholder=\"Username\"></div><div class=\"text-center form-group\"><button type=\"submit\" class=\"btn btn-large btn-primary\">Save Profile</button></div><div data-ng-show=\"success\" class=\"text-center text-success\"><strong>Profile Saved Successfully</strong></div><div data-ng-show=\"error\" class=\"text-center text-danger\"><strong data-ng-bind=\"error\"></strong></div></fieldset></form></div></section>"
  );

  $templateCache.put("modules/users/views/settings/social-accounts.client.view.html",
    "<section class=\"row\" data-ng-controller=\"SettingsController\"><h3 class=\"col-md-12 text-center\" data-ng-show=\"hasConnectedAdditionalSocialAccounts()\">Connected social accounts:</h3><div class=\"col-md-12 text-center\"><div data-ng-repeat=\"(providerName, providerData) in user.additionalProvidersData\" class=\"remove-account-container\"><img ng-src=\"/modules/users/img/buttons/{{providerName}}.png\"> <a class=\"btn btn-danger btn-remove-account\" data-ng-click=\"removeUserSocialAccount(providerName)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><h3 class=\"col-md-12 text-center\">Connect other social accounts:</h3><div class=\"col-md-12 text-center\"><a href=\"/auth/facebook\" data-ng-hide=\"isConnectedSocialAccount('facebook')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/facebook.png\"></a> <a href=\"/auth/twitter\" data-ng-hide=\"isConnectedSocialAccount('twitter')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/twitter.png\"></a> <a href=\"/auth/google\" data-ng-hide=\"isConnectedSocialAccount('google')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/google.png\"></a> <a href=\"/auth/linkedin\" data-ng-hide=\"isConnectedSocialAccount('linkedin')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/linkedin.png\"></a> <a href=\"/auth/github\" data-ng-hide=\"isConnectedSocialAccount('github')\" class=\"undecorated-link\"><img src=\"/modules/users/img/buttons/github.png\"></a></div></section>"
  );

}]);
