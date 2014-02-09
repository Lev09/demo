$(function() {
	({
		peer: new Peer({key: "oftz4qdmchjxxbt9"}),
	
		connect: function(destId) {
			var conn = this.peer.connect(destId);
		
			conn.on("open", function() {
				$('#status').text("CONNECTED");
			});
		},
		
		init: function() {
			var app = this;			
			
			window.addEventListener("message", function(event) {
				app.connect(event.data);
			}, false);
			
		}
		
	}).init();

});
