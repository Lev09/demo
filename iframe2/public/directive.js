angular.module('app')
.directive('peerId', function() {
	return {
		template: '{{peerID}}',
		scope: {
			peerTransfer: '='
		},
		
		link: function(scope, elem, attr) {
				
			$(function() {
				({
					peer: new Peer({key: "oftz4qdmchjxxbt9"}),
					parentScope: scope.$parent,

					initDataTransfer: function(conn) {
						var app = this;
							
						conn.on('data', function(data) {
							scope.peerTransfer.reciveData(data)
						});
					
						scope.peerTransfer.sendData = function(data) {
							conn.send(data)
						};
						scope.$apply();

					},
	
					sendToParent: function(id) {
						if(document.referrer != "") {
							window.parent.postMessage(id, document.referrer);
						}
					},
	
					init: function() {
						var app = this;
						//in main page
						this.createIframe();
						this.initEvent();
						//in iframe
						this.peer.on('open', function(id) {
							app.sendToParent(id);
							
							app.peer.on('connection', function(conn) {							
								app.initDataTransfer(conn);
							});
							
						});

					},
					
					createIframe: function() {
						if(document.referrer == "") {
							$(elem).prepend('<iframe src="'+attr.peerId+'"></iframe>');
						}
					},

					initEvent: function() {
						var app = this;			
	
						window.addEventListener("message", function(event) {
							if(event.origin == attr.peerId) {
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
					
				}).init();
			
			});
		
		}
		
	};
});
