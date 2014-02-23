angular.module('app')
.directive('peerConnection', function() {
	
	return {
		restrict: 'E',
		
		replace: true,
		
		scope: {
		
			interface: '=',
			
			config: '='
		
		},

		template: '<div></div>',
		
		link: function(scope, elem, attr) {
			
			var app = {
				peer: null,
				
				setPeerKey: function(key) {
					if(this.peer === null) {
						this.peer = new Peer({key:key});
					}
				},
			
				init: function() {
					var app = this;
					this.setPeerKey(scope.config.key);
					
					this.peer.on('open', function(id) {
						app.sendToParent(id);
					
						app.peer.on('connection', function(conn) {							
							app.initDataTransfer(conn);
						});
					
					});
				
				},

				sendToParent: function(id) {
					window.parent.postMessage(id, document.referrer);
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
	
});