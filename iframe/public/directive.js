angular.module('app')
.directive('peerId', function() {
	return {
		template: '{{status}}',
		
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
					
						this.initEvent();
						this.peer.on('open', function(id) {
							app.sendToParent(id);
						});

					},

					connect: function(destId) {
						var conn = this.peer.connect(destId);

						conn.on("open", function() {
							scope.status = "CONNECTED";
							scope.$apply();
						});
					},

					initEvent: function() {
						var app = this;			
	
						window.addEventListener("message", function(event) {
							app.connect(event.data);
						}, false);
	
					}

				}).init();
			
			});
		
		}
		
	};
});
