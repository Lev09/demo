angular.module('app')
.directive('peerConnection', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			interface: '=',
		},
		template: '<iframe></iframe>',
		
		link: function(scope, elem, attr) {
			
			var app = {
				peer: new Peer({key: scope.interface.key}),
				
				init: function() {
					this.initEvent();
				},
				
				initEvent: function() {
					var app = this;			
					
					window.addEventListener("message", function(event) {
						if(event.origin == attr.ngSrc) {
							app.connect(event.data);
						}
					}, false);
				
				},
				
				connect: function(destId) {
					var app = this;
					var conn = this.peer.connect(destId);

					conn.on("open", function() {
						scope.$apply(function() {
							scope.peerID = conn.peer;
						});
						app.initDataTransfer(conn);
					});
				},
				
				initDataTransfer: function(conn) {
					$("body").append('<h3>Connected</h3> ' + scope.peerID);
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
