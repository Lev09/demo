angular.module('app')
.directive('peerId', function() {
	return {
		template: '{{peerID}}',
		scope: {},
		
		link: function(scope, elem, attr) {
				
			$(function() {
				({
					peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
					sendToParent: function(id) {
						if(document.referrer != "") {
							window.parent.postMessage(id, document.referrer);
						}
					},
	
					init: function() {
						var app = this;
					
						this.createIframe();
						this.initEvent();
						this.peer.on('open', function(id) {
							app.sendToParent(id);
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
						var conn = this.peer.connect(destId);

						conn.on("open", function() {
							scope.peerID = conn.peer;
							scope.$apply();
						});
					}
					
				}).init();
			
			});
		
		}
		
	};
});
