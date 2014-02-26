angular.module('app')
.directive('peerConnection', ['$sce', 'peerService', function($sce, peerService) {

	return {
		restrict: 'E',
		replace: true,
		
		scope: {
			interface: '='
		},
		
		template: '<iframe ng-src="{{url}}"></iframe>',
		
		link: function(scope, elem, attr) {
			scope.url = $sce.trustAsResourceUrl(attr.src);
			
			var directive = {
				key: "oftz4qdmchjxxbt9",
				peer: null,
				
				init: function() {
					peerService.interface = scope.interface;
					this.createPeerIfNeded(this.key);
					this.initEvent();
				},

				createPeerIfNeded: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});

						this.peer.on('error', function(error) {
							peerService.notifyError(error);
						});

					}
				},
				
				initEvent: function() {
					var directive = this;			
					
					window.addEventListener("message", function(event) {
							directive.connect(event.origin, event.data);
					}, false);
				
				},
				
				connect: function(destOrigin, destId) {
					var directive = this;
					if(destOrigin === attr.src) {	
						var conn = this.peer.connect(destId);

						conn.on('open', function() {
							directive.initInterface(conn);
							directive.initConnection(conn);
						});
					
					}
				},
				
				initInterface: function(conn) {
				
					scope.interface.sendData = function(data) {
						peerService.sendData(conn, data);
					};
				
					scope.interface.disconnectPeer = function() {
						peerService.disconnectPeer(conn);
					};
					
					scope.interface.destroyPeer = function() {
						peerService.destroyPeer(this.peer);
					};
				
				},
				
				initConnection: function(conn) {
					
					conn.on('error', function(error) {
						peerService.notifyError(error);
					});

					conn.on('data', function(data) {
						peerService.notifyDataReceived(data);
					});					
					
				}
				
			};
				
			directive.init();
		}
		
	};
	
}]);
