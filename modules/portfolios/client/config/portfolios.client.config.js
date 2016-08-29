(function () {
  'use strict';

  angular
    .module('portfolios')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Portfolio',
      state: 'portfolios',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'portfolios', {
      title: 'My Work',
      state: 'portfolios.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'portfolios', {
      title: 'Create New Work',
      state: 'portfolios.create',
      roles: ['user']
    });
  }
})();
