(function () {
  'use strict';

  angular
    .module('portfolios')
    .directive('backgroundimage', backgroundimage);

  backgroundimage.$inject = [/*Example: '$state', '$window' */];

  function backgroundimage(/*Example: $state, $window */) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Backgroundimage directive logic
        // ...

        element.text('this is the backgroundimage directive');
      }
    };
  }
})();
