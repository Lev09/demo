var app = {
	peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
	sendId: function(id) {
		window.parent.postMessage(id, "http://localhost:8001");
	},
	
	connect: function() {
		
		this.peer.on('open', function(id) {
			if(id) {
				app.sendId(id);
			}
		});

		this.peer.on('connection', function(conn) {
			conn.on('data', function(data) {
				document.getElementById("status").innerHTML = data;
			});
		});
		
	}
	
};
app.connect();
