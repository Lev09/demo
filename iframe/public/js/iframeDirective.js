angular.module('app')
.directive('iframeDirective',['$sce', function($sce) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			peerConnection: '=',
		},
		template: '<div>{{template}}</div>',
		
		link: function(scope, elem, attr) {
			
			scope.iframeUrl = $sce.trustAsResourceUrl(attr.url);
			var app = {
				peer: new Peer({key: "oftz4qdmchjxxbt9"}),
				
				setTemplate: function() {
					scope.template = '<iframe ng-src="{{iframeUrl}}"></iframe> {{peerID}}';
				},

				initDataTransfer: function(conn) {
					var app = this;
						
					conn.on('data', function(data) {
						scope.peerConnection.reciveData(data)
					});
				
					scope.peerConnection.sendData = function(data) {
						conn.send(data)
					};
					scope.$apply();

				},

				sendToParent: function(id) {
					window.parent.postMessage(id, document.referrer);
				},

				init: function() {
					var app = this;
					
					//work in main page
					if(document.referrer == "") {
						this.setTemplate();
						this.initEvent();
					}
					
					//work in iframe
					else {
					
						this.peer.on('open', function(id) {
							app.sendToParent(id);
						
							app.peer.on('connection', function(conn) {							
								app.initDataTransfer(conn);
							});
						
						});
					
					}
				},
				
				initEvent: function() {
					var app = this;			
					
					window.addEventListener("message", function(event) {
						if(event.origin == attr.url) {
							app.connect(event.data);
						}
					}, false);
				
				},

				connect: function(destId) {
					var app = this;
					var conn = this.peer.connect(destId);

					conn.on("open", function() {
						scope.peerID = conn.peer;
						scope.$apply();
						app.initDataTransfer(conn);
					});
				}
				
			};
				
			app.init();
		}
		
	};
}]);
