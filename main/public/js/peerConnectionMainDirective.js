angular.module('app')
.directive('peerConnection', ['$sce', function($sce) {

	return {
		restrict: 'E',
		replace: true,
		
		scope: {
			interface: '='
		},
		
		template: '<iframe ng-src="{{url}}"></iframe>',
		
		link: function(scope, elem, attr) {
			
			scope.url = $sce.trustAsResourceUrl(attr.src);
			
			var peerService = {
				key: "oftz4qdmchjxxbt9",
				peer: null,
				
				init: function() {
					this.createPeerIfNeded(this.key);
					this.initEvent();
				},
				
				createPeerIfNeded: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});

						this.peer.on('error', function(error) {
							peerService.onError(error);
						});

					}
				},
				
				initEvent: function() {
					var peerService = this;			
					
					window.addEventListener("message", function(event) {
							peerService.connect(event.origin, event.data);
					}, false);
				
				},
				
				connect: function(destOrigin, destId) {
					var peerService = this;
					if(destOrigin === attr.src) {	
						var conn = this.peer.connect(destId);

						conn.on('open', function() {
							peerService.initInterface(conn);
							peerService.initConnection(conn);
						});
					
					}
				},
				
				initInterface: function(conn) {
				
					scope.interface.sendData = function(data) {
						conn.send(data);
					};
				
					scope.interface.disconnectPeer = function() {
						conn.close();
					};
					
					scope.interface.destroyPeer = function() {
						this.peer.destroy();
					};
				
				},
				
				initConnection: function(conn) {
					var peerService = this;
					
					conn.on('error', function(error) {
						peerService.onError(error);
					});

					conn.on('data', function(data) {
						peerService.onData(data);
					});					
					
				},
				
				onError: function(error) {
					scope.interface.onError(error);
				},

				onData: function(data) {
					scope.interface.reciveData(data);
				}

			};
				
			peerService.init();
		}
		
	};
	
}]);

