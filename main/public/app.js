$(function() {
	var app = {
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
		init: function(destId) {
			var p2p = this;
			var conn = p2p.peer.connect(destId);
		
			conn.on("open", function() {
				conn.send("CONNECTED");
			});
		}
	
	};

	window.addEventListener("message", function(event) {
		app.init(event.data);
	}, false);

});
