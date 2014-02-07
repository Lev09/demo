//frame script

var peer = new Peer({key: "oftz4qdmchjxxbt9"});
var myId = undefined;

peer.on('open', function(id) {
  console.log('iframe peer ID is: ' + id);
  myId = id;
});

//start connection
var connect = function(destId) {
	var conn = peer.connect(destId);

	conn.on("open", function() {
		conn.send("hello from iframe");
	});
};
	
//recive coonection
peer.on('connection', function(conn) {
	conn.on('data', function(data) {
		alert(data);
	});
});

var sendId = function() {
	window.parent.postMessage(myId, "http://localhost:8001");
};

window.addEventListener("message", function(event) {
	document.getElementById("mainId").innerHTML = event.data;
	connect(event.data);
}, false);
