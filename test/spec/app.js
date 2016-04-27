describe('FileUpload', function() {

  describe('#getSignedRequest()', function() {

    it('should make callback', function() {
      spyOn($, 'ajax').and.callFake(function(e) {
        e.success({});
      });

      var foo = jasmine.createSpy();

      fileUpload.getSignedRequest({}, foo);
      expect(foo).toHaveBeenCalled();
    });

    it('should make AJAX request', function() {
      spyOn($, 'ajax');

      fileUpload.getSignedRequest({}, function() {});
      expect($.ajax).toHaveBeenCalled();
    });
  });

  describe('#uploadFile()', function() {

    it('should make callback', function() {
      spyOn($, 'ajax').and.callFake(function(e) {
        e.success({});
      });

      var foo = jasmine.createSpy();

      fileUpload.uploadFile('', '', '', foo);
      expect(foo).toHaveBeenCalled();
    });

    it('should make AJAX request', function() {
      spyOn($, 'ajax');

      fileUpload.uploadFile({}, '', 'url');
      expect($.ajax).toHaveBeenCalled();
    });
  });
});
