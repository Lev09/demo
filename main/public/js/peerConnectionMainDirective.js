angular.module('app')
.directive('peerConnection', ['$sce', function($sce) {
	
	var peer = null;
		
	var	setPeerKey = function(key) {
		if(peer === null) {
			peer = new Peer({key:key});
		}
	};
	
	return {
		restrict: 'E',
		
		replace: true,
		
		scope: {
		
			interface: '=',
			
			config: '='
		
		},
		
		template: '<iframe ng-src="{{url}}"></iframe>',
		
		link: function(scope, elem, attr) {
			
			scope.url = $sce.trustAsResourceUrl(attr.src);
			
			var app = {
				
				init: function() {
					this.initEvent();
					setPeerKey(scope.config.key);
				},
				
				initEvent: function() {
					var app = this;			
					
					window.addEventListener("message", function(event) {
						if(event.origin == attr.src) {
							app.connect(event.data);
						}
					}, false);
				
				},
				
				connect: function(destId) {
					var app = this;
					var conn = peer.connect(destId);

					conn.on("open", function() {
						app.initDataTransfer(conn);
					});
				},
				
				initDataTransfer: function(conn) {
					
					conn.on('data', function(data) {
						scope.interface.reciveData(data)
					});
				
					scope.$apply(function() {
						scope.interface.sendData = function(data) {
							conn.send(data)
						};
					});

				}

			};
				
			app.init();
		}
		
	};
	
}]);
