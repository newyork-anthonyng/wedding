describe('ImageHelper', function() {

	describe('#getAllImages()', function() {

		it('should make AJAX request', function() {
			spyOn($, 'ajax').and.callFake(function(e) {
				e.success({});
			});

			var foo = jasmine.createSpy();

			imageHelper.getAllImages(foo);
			expect($.ajax).toHaveBeenCalled();
			expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('image/all');
			expect(foo).toHaveBeenCalled();
		});
	});
});
