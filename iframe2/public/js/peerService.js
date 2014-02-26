angular.module('app')
.factory('peerService', function() {

	return {
		interface: null,
		
		notifyDataReceived: function(data) {
			this.interface.reciveData(data);
		},
		
    sendData: function(conn, data) {
    	conn.send(data);
    }
  	
	};

});
