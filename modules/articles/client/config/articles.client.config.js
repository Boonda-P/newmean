'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Blog',
      state: 'articles',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Blog',
      state: 'articles.list'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Music',
      state: 'articles.music'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Games',
      state: 'articles.games'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Tech',
      state: 'articles.tech'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Top 10s',
      state: 'articles.top10s'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create Blog Section',
      state: 'articles.create',
      roles: ['admin']
    });

    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'articles', {
    //   title: 'Give a Suggestion',
    //   state: 'articles.suggest',
    //   roles: ['*']
    // });
  }
]);
