angular.module('app')
.directive('iframeDirective',['$sce', function($sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			peerConnection: '=',
		},
		template: '<div>{{peerID}}</div>',
		
		link: function(scope, elem, attr) {
			
			var app = {
				peer: new Peer({key: scope.peerConnection.key}),

				init: function() {
					//work in main page
					if(document.referrer == "") {
						this.initMainPage();
					}
					
					//work in iframe
					else {
						this.initIframe();
					}
				},
				
				initMainPage: function() {
					this.initEvent();
					this.createIframe();
				},
				
				initEvent: function() {
					var app = this;			
					
					window.addEventListener("message", function(event) {
						if(event.origin == attr.url) {
							app.connect(event.data);
						}
					}, false);
				
				},
				
				createIframe: function() {
					$(elem).prepend("<iframe src=" + attr.url + "></iframe>");
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
				
				initIframe: function() {
					var app = this;
					
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
				
				//this function will be used in both side
				initDataTransfer: function(conn) {
	
					conn.on('data', function(data) {
						scope.peerConnection.reciveData(data)
					});
				
					scope.$apply(function() {
						scope.peerConnection.sendData = function(data) {
							conn.send(data)
						};
					});

				}

			};
				
			app.init();
		}
		
	};
}]);
