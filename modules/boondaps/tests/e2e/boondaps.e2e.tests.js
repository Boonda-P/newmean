'use strict';

describe('Boondaps E2E Tests:', function () {
  describe('Test Boondaps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/boondaps');
      expect(element.all(by.repeater('boondap in boondaps')).count()).toEqual(0);
    });
  });
});
