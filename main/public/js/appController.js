angular.module('app', [])
.controller('appController', function($scope) {
	
	var controller = {

		interface: {

			reciveData: function(data){
				controller.reciveData(data);
			},
			
			onError: function(error) {
				controller.onError(error);
			}
			
		},
		
		init: function() {
			var controller = this;
			$scope.interface = this.interface;
			
			$scope.send = function() {
				controller.sendData("hello");
			};
			
			$scope.destroyPeer = function() {
				controller.destroyPeer();
			};
			
			$scope.disconnectPeer = function() {
				controller.disconnect();
			};
		
		},
		
		sendData: function(data) {
			this.interface.sendData(data);
		},
		
		reciveData: function(data) {
			alert('main ' + data);
		},
		
		onError: function(error) {
			alert(error.message);
		},
		
		disconnect: function() {
			this.interface.disconnectConnection();
		},
		
		destroyPeer: function() {
			this.interface.destroyPeer();
		}
	
	};
	
	controller.init();
	
});
