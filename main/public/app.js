$(function() {
	var app = {
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
		connect: function(destId) {
			var app = this;
			var conn = app.peer.connect(destId);
		
			conn.on("open", function() {
				$('#status').text("CONNECTED");
			});
		},

	};

		window.addEventListener("message", function(event) {
			app.connect(event.data);
		}, false);
	
});
