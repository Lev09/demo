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
			
			$scope.destroy = function() {
				controller.destroyPeer();
			};
			
			$scope.disconnect = function() {
				controller.disconnectPeer();
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
		
		disconnectPeer: function() {
			this.interface.disconnectPeer();
		},
		
		destroyPeer: function() {
			this.interface.destroyPeer();
		}
	
	};
	
	controller.init();
	
});
