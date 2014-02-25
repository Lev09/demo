angular.module('app')
.directive('peerConnection', function() {
	
	return {
		restrict: 'E',
		replace: true,
		
		scope: {
			interface: '='
		},

		template: '<div></div>',
		
		link: function(scope, elem, attr) {
			
			var peerService = {
				key: "oftz4qdmchjxxbt9",
				peer: null,
				
				createPeerIfNeded: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});
					}
				},
			
				init: function() {
					var peerService = this;
					this.createPeerIfNeded(this.key);
					
					this.peer.on('open', function(id) {
						peerService.sendToParent(id);
					
						peerService.peer.on('connection', function(conn) {							
							peerService.initInterface(conn);
							peerService.initConnection(conn);
						});
					
					});
				
				},

				sendToParent: function(id) {
					window.parent.postMessage(id, document.referrer);
				},
				
				initInterface: function(conn) {
					scope.interface.sendData = function(data) {
						conn.send(data)
					};					
				},
				
				initConnection: function(conn) {
	
					conn.on('data', function(data) {
						peerService.onData(data)
					});
				
				},
				
				onData: function(data) {
					scope.interface.reciveData(data)
				}
				
			};
				
			peerService.init();
		}
		
	};
	
});
