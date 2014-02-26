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
    
    disconnect: function(conn) {
    	conn.close();
    },
    
    destroy: function(peer)	{
    	peer.destroy();
    }
	};
	
});
