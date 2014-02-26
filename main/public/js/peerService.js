angular.module('app')
.factory('peerService', function() {
	
	return {
		interface: null,
		
		notifyDataReceived: function(data) {
			this.interface.reciveData(data);
		},
			
		notifyError: function(error) {
			this.interface.onError(error);
		},
		
		sendData: function(conn, data) {
			conn.send(data);
		},
		
		disconnectPeer: function(conn) {
		    conn.close();
		},
		
		destroyPeer: function(peer)	{
			peer.destroy();
		}
	};
	
});
