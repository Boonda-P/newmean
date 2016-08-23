(function () {
  'use strict';

  angular
    .module('boondaps')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Boondaps',
      state: 'boondaps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'boondaps', {
      title: 'List Boondaps',
      state: 'boondaps.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'boondaps', {
      title: 'Create Boondap',
      state: 'boondaps.create',
      roles: ['user']
    });
  }
})();
