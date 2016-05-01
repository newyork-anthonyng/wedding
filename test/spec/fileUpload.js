describe('FileUpload', function() {

  describe('#getSignedRequest()', function() {

    it('should make AJAX request', function() {
      spyOn($, 'ajax');

      fileUpload.getSignedRequest({}, function() {});
      expect($.ajax).toHaveBeenCalled();
    });
  });

  describe('#uploadFile()', function() {

    it('should make AJAX request', function() {
      spyOn($, 'ajax');

      fileUpload.uploadFile({}, '', 'url');
      expect($.ajax).toHaveBeenCalled();
    });
  });

  describe('#updateDatabase()', function() {
    it('should make ajax call to image/upload', function() {
      spyOn($, 'ajax').and.callFake(function(e) {
        e.success({});
      });

      var testData = {
        url: 'www.test.com',
        file: 'Filename.png'
      };

      fileUpload.updateDatabase(testData);
      expect($.ajax).toHaveBeenCalled();
      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/image/upload');
      expect($.ajax.calls.mostRecent().args[0]['data']['url']).toEqual('www.test.com');
      expect($.ajax.calls.mostRecent().args[0]['data']['file']).toEqual('Filename.png');
    });
  });
});
