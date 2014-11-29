'use strict';
angular
    .module('core')
    .run(
    function ($translate,  LocalStorage) {

        // Init data
        $translate.use(LocalStorage.getLocale());
    });
