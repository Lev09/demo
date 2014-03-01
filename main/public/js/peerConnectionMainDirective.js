angular.module('app').directive('peerConnection', ['$sce', 'peerService', function($sce, peerService) {

	return {
		restrict: 'E',
		replace: true,
		template: '<iframe ng-src="{{url}}"></iframe>',
		
		scope: {
			interface: '='
		},				
		
		link: function(scope, elem, attr) {			
			scope.url = $sce.trustAsResourceUrl(attr.src);
			
			var directive = {
				
				init: function() {
				  peerService.init(scope.interface, attr.key);

					window.addEventListener(
						"message",

						function(event) {
							directive.connect(event.origin, event.data);
						}, 
					  
						false
					);
									
				},
				
				connect: function(origin, id) {
					var directive = this;
					if(origin == attr.src) {	
						peerService.connect(scope.interface, id);					
					}
				}
				
			};
				
			directive.init();
		}
		
	};
	
}]);
