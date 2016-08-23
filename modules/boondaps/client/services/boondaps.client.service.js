//Boondaps service used to communicate Boondaps REST endpoints
(function () {
  'use strict';

  angular
    .module('boondaps')
    .factory('BoondapsService', BoondapsService);

  BoondapsService.$inject = ['$resource'];

  function BoondapsService($resource) {
    return $resource('api/boondaps/:boondapId', {
      boondapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
