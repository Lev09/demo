angular.module('app')
.directive('peerConnection', ['peerService', function(peerService) {
	
	return {
		restrict: 'E',
		replace: true,
		
		scope: {
			interface: '='
		},

		template: '<div></div>',
		
		link: function(scope, elem, attr) {
			
			var directive = {
				peer: null,
				key: "oftz4qdmchjxxbt9",
				
				createPeerIfNeded: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});
					}
				},
			
				init: function() {
					var directive = this;
					this.createPeerIfNeded(this.key);
					
					this.peer.on('open', function(id) {
						directive.sendToParent(id);
					
						directive.peer.on('connection', function(conn) {							
							directive.initInterface(conn);
							directive.initConnection(conn);
						});
					
					});
				
				},

				sendToParent: function(id) {
					window.parent.postMessage(id, document.referrer);
				},
				
				initInterface: function(conn) {
				
					scope.interface.sendData = function(data) {
						peerService.sendData(conn, data);
					};
					
					peerService.interface = scope.interface;					
				},
				
				initConnection: function(conn) {
	
					conn.on('data', function(data) {
						peerService.notifyDataReceived(data)
					});
					
				}
				
			};
				
			directive.init();
		}
		
	};
	
}]);
