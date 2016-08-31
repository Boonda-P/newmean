(function () {
  'use strict';

  angular
    .module('articles')
    .directive('top10s', top10s);

  top10s.$inject = [/*Example: '$state', '$window' */];

  function top10s(/*Example: $state, $window */) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Top10s directive logic
        // ...

        element.text('this is the top10s directive');
      }
    };
  }
})();
