(function () {
  'use strict';

  angular
    .module('boondaps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('boondaps', {
        abstract: true,
        url: '/boondaps',
        template: '<ui-view/>'
      })
      .state('boondaps.list', {
        url: '',
        templateUrl: 'modules/boondaps/client/views/list-boondaps.client.view.html',
        controller: 'BoondapsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Boondaps List'
        }
      })
      .state('boondaps.create', {
        url: '/create',
        templateUrl: 'modules/boondaps/client/views/form-boondap.client.view.html',
        controller: 'BoondapsController',
        controllerAs: 'vm',
        resolve: {
          boondapResolve: newBoondap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Boondaps Create'
        }
      })
      .state('boondaps.edit', {
        url: '/:boondapId/edit',
        templateUrl: 'modules/boondaps/client/views/form-boondap.client.view.html',
        controller: 'BoondapsController',
        controllerAs: 'vm',
        resolve: {
          boondapResolve: getBoondap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Boondap {{ boondapResolve.name }}'
        }
      })
      .state('boondaps.view', {
        url: '/:boondapId',
        templateUrl: 'modules/boondaps/client/views/view-boondap.client.view.html',
        controller: 'BoondapsController',
        controllerAs: 'vm',
        resolve: {
          boondapResolve: getBoondap
        },
        data:{
          pageTitle: 'Boondap {{ articleResolve.name }}'
        }
      });
  }

  getBoondap.$inject = ['$stateParams', 'BoondapsService'];

  function getBoondap($stateParams, BoondapsService) {
    return BoondapsService.get({
      boondapId: $stateParams.boondapId
    }).$promise;
  }

  newBoondap.$inject = ['BoondapsService'];

  function newBoondap(BoondapsService) {
    return new BoondapsService();
  }
})();
