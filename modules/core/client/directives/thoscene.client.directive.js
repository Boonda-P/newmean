(function () {
  'use strict';

  angular
    .module('core')
    .directive('thoscene', thoscene);

  thoscene.$inject = ['$state', '$window'];

  function thoscene($state, $window) {
    return {
      template: '<p class="lead">Thoscene</p><img class="fourhundred col-lg-12 col-md-12 col-sm-12 col-xs-12" src="modules/portfolios/client/img/tesalating-phone.gif" />',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Thoscene directive logic
        // ...
      }
    };
  }
})();
