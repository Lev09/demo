angular.module('app').directive('peerConnection', ['peerService', function(peerService) {
	
	return {
		restrict: 'E',
		replace: true,
		template: '<div></div>',
		
		scope: {
			interface: '='
		},				
		
		link: function(scope, elem, attr) {			

			var directive = {
				
				init: function() {
				  peerService.init(scope.interface, attr.key);
				}
				
			};
				
			directive.init();
		}
		
	};
	
}]);
