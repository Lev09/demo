angular.module('app')
.directive('peerConnection', function() {
	
	var peer = null;
		
	var	setPeerKey = function(key) {
		peer = new Peer({key:key});
	};
	
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
			
				init: function() {
					var app = this;
					setPeerKey(scope.config.key);
					
					peer.on('open', function(id) {
						app.sendToParent(id);
					
						peer.on('connection', function(conn) {							
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
