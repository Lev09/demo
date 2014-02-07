var app = {
	
	writeId: function(id) {
		document.getElementById("iframeId").innerHTML = id;
	},
	
	connect: function(destId) {
		this.writeId(destId);
			
		var peer = new Peer({key: "oftz4qdmchjxxbt9"});
		var conn = peer.connect(destId);

		conn.on("open", function() {
			conn.send("CONNECTED");
		});
	}
	
};

window.addEventListener("message", function(event) {
	app.connect(event.data);
}, false);
