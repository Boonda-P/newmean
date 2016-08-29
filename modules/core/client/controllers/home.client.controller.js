
'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
  function ($scope, Authentication, $http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.mypic = 'modules/users/client/img/profile/uploads/61762a8dc2f3beea4d72b65d477a110c';

    $scope.contactmets = [
      {
        href: 'tel:203-241-6318',
        fa: 'fa-mobile',
        contactMethod: 'Cell'
      },
      {
        href: 'mailto:garyfrey9@gmail.com',
        fa: 'fa-envelope-o',
        contactMethod: 'Email'
      },
      {
        href: 'https://github.com/crashog',
        fa: 'fa-github',
        contactMethod: 'Github'
      },
      {
        href: 'https://www.facebook.com/Celestiaku',
        fa: 'fa-facebook',
        contactMethod: 'Facebook'
      },
      {
        href: 'http://stackoverflow.com/users/4820726/gary-frey',
        fa: 'fa-stack-overflow',
        contactMethod: 'Stackoverflow'
      },
      {
        href: 'https://twitter.com/Boonda_P',
        fa: 'fa-twitter',
        contactMethod: 'Twitter'
      }
    ];

    

  }
]);
