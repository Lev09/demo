$(function () {
	var app = {
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
		init: function() {
			var p2p = this;
		
			p2p.peer.on('open', function(id) {
				window.parent.postMessage(id, "http://localhost:8001");
			});

			p2p.peer.on('connection', function(conn) {
				conn.on('data', function(data) {
					$("#status").text(data);
				});
			});
		
		}
	
	}.init();

});
