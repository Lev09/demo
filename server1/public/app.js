var app = {
	peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
	write: function(status) {
		document.getElementById("status").innerHTML = status;
	},
	
	connect: function(destId) {
		var conn = app.peer.connect(destId);
		
		conn.on("open", function() {
			conn.send("CONNECTED");
			app.write("CONNECTED");
		});
	}
	
};

window.addEventListener("message", function(event) {
	app.connect(event.data);
}, false);
