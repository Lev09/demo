angular.module('app').factory('peerService', function() {

	return {
		peers: [],
		
		init: function(interface, key) {
			if(this.peers[key] == null) {
				this.peers[key] = new Peer({key: key});
			}
			interface.key = key;
			interface.peer = this.peers[key];
			this.onServerConnection(interface);
		},
	
		onServerConnection: function(interface) {
			var service = this;
			
			interface.peer.on("open", function(id) {
				service.sendId(id);
				service.initConnectionEvent(interface);
			});
		},
		
		sendId: function(id) {
			window.parent.postMessage(id, document.referrer);
		},
		
		initConnectionEvent: function(interface) {
			var service = this;
			
			interface.peer.on("connection", function(connection) {
				service.initInterface(interface, connection);
				service.initConnection(interface, connection);
			});
		},
		
		initInterface: function(interface, connection) {
			interface.sendData = function(data) {
				connection.send(data);
			};
		},
		
		initConnection: function(interface, connection) {
			connection.on("data", function(data) {
				interface.reciveData(data);
			});
		}

	};

});
