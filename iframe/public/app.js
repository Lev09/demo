$(function () {
	{
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
		
		sendToParent: function(id) {
			window.parent.postMessage(id, "http://localhost:8001");
		},
		
		init: function() {
			
			this.peer.on('open', function(id) {
				this.sendToParent(id);
			});

		}
	
	}.init();

});
