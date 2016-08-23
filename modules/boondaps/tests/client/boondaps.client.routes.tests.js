(function () {
  'use strict';

  describe('Boondaps Route Tests', function () {
    // Initialize global variables
    var $scope,
      BoondapsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BoondapsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BoondapsService = _BoondapsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('boondaps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/boondaps');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          BoondapsController,
          mockBoondap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('boondaps.view');
          $templateCache.put('modules/boondaps/client/views/view-boondap.client.view.html', '');

          // create mock Boondap
          mockBoondap = new BoondapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Boondap Name'
          });

          //Initialize Controller
          BoondapsController = $controller('BoondapsController as vm', {
            $scope: $scope,
            boondapResolve: mockBoondap
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:boondapId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.boondapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            boondapId: 1
          })).toEqual('/boondaps/1');
        }));

        it('should attach an Boondap to the controller scope', function () {
          expect($scope.vm.boondap._id).toBe(mockBoondap._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/boondaps/client/views/view-boondap.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BoondapsController,
          mockBoondap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('boondaps.create');
          $templateCache.put('modules/boondaps/client/views/form-boondap.client.view.html', '');

          // create mock Boondap
          mockBoondap = new BoondapsService();

          //Initialize Controller
          BoondapsController = $controller('BoondapsController as vm', {
            $scope: $scope,
            boondapResolve: mockBoondap
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.boondapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/boondaps/create');
        }));

        it('should attach an Boondap to the controller scope', function () {
          expect($scope.vm.boondap._id).toBe(mockBoondap._id);
          expect($scope.vm.boondap._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/boondaps/client/views/form-boondap.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BoondapsController,
          mockBoondap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('boondaps.edit');
          $templateCache.put('modules/boondaps/client/views/form-boondap.client.view.html', '');

          // create mock Boondap
          mockBoondap = new BoondapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Boondap Name'
          });

          //Initialize Controller
          BoondapsController = $controller('BoondapsController as vm', {
            $scope: $scope,
            boondapResolve: mockBoondap
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:boondapId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.boondapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            boondapId: 1
          })).toEqual('/boondaps/1/edit');
        }));

        it('should attach an Boondap to the controller scope', function () {
          expect($scope.vm.boondap._id).toBe(mockBoondap._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/boondaps/client/views/form-boondap.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
