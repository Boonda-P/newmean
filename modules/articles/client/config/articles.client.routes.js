'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/blog',
        template: '<ui-view/>'
      })
      .state('articles.list', {
        url: '',
        templateUrl: 'modules/articles/client/views/list-articles.client.view.html'
      })
      .state('articles.top10s', {
        url: '/top10s',
        templateUrl: 'modules/articles/client/views/top10s.client.view.html'
      })
      .state('articles.music', {
        url: '/music',
        templateUrl: 'modules/articles/client/views/music.client.view.html'
      })
      .state('articles.games', {
        url: '/games',
        templateUrl: 'modules/articles/client/views/games.client.view.html'
      })
      .state('articles.tech', {
        url: '/tech',
        templateUrl: 'modules/articles/client/views/tech.client.view.html'
      })
      .state('articles.create', {
        url: '/create',
        templateUrl: 'modules/articles/client/views/create-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('articles.view', {
        url: '/:articleId',
        templateUrl: 'modules/articles/client/views/view-article.client.view.html'
      })
      .state('articles.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
