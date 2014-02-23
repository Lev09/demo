angular.module('app')
.directive('peerConnection', ['$sce', function($sce) {
	
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
				peer: null,
				
				init: function() {
					this.setPeerKey(scope.config.key);
					this.initEvent();
					this.initOnPeerError();
				},
				
				setPeerKey: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});
					}
				},
				
				initEvent: function() {
					var app = this;			
					
					window.addEventListener("message", function(event) {
						if(event.origin == attr.src) {
							app.connect(event.data);
						}
					}, false);
				
				},
				
				initOnPeerError: function() {
					this.peer.on('error', function(error) {
						scope.config.onError(error);
					});
				},
				
				connect: function(destId) {
					var app = this;
					var conn = this.peer.connect(destId);
					this.initOnConnectionError(conn);
					this.initDisconnection(conn);

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

				},
				
				initOnConnectionError: function(conn) {
					conn.on('error', function(error) {
						scope.config.onError(error);
					});
				},
				
				initDisconnection: function(conn) {
				
					scope.config.disconnect = function() {
						conn.close()
					};
					
					scope.config.destroy = function() {
						peer.destroy();
					};
				
				}

			};
				
			app.init();
		}
		
	};
	
}]);
