var peer = new Peer({key: "oftz4qdmchjxxbt9"});
var myId = undefined;

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  myId = id;
});

// start connection
var connect = function(destId) {
	var conn = peer.connect(destId);
	
	conn.on("open", function() {
		conn.send("hello from main page");
	});
};

// recive connection
peer.on('connection', function(conn) {
	conn.on('data', function(data) {
	  alert(data);
	});
});

var sendId = function() {
	var win = document.getElementById("iframe").contentWindow;
	win.postMessage(myId, "http://localhost:8002");
};

window.addEventListener("message", function(event) {
	document.getElementById("iframeId").innerHTML = event.data;
	connect(event.data);
}, false);
