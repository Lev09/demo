var app = {
	myId: undefined,
	
	sendId: function(id) {
		window.parent.postMessage(id, "http://localhost:8001");
	},
	
	connect: function() {
		var peer = new Peer({key: "oftz4qdmchjxxbt9"});
		
		peer.on('open', function(id) {
			app.sendId(id);
		});

		peer.on('connection', function(conn) {
			conn.on('data', function(data) {
				document.getElementById("status").innerHTML = data;
			});
		});

	}
	
};
