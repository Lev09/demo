$(function() {
	({
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
		
		sendToParent: function(id) {
			window.parent.postMessage(id, "http://localhost:8001");
		},
		
		init: function() {
			var app = this;
			
			this.peer.on('open', function(id) {
				app.sendToParent(id);
			});

		}
	
	}).init();

});
