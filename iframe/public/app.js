$(function () {
	var app = {
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
		init: function() {
			
			this.peer.on('open', function(id) {
				window.parent.postMessage(id, "http://localhost:8001");
			});

		}
	
	}.init();

});
