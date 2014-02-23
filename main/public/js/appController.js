angular.module('app', [])
.controller('appController', function($scope) {
	
	var controller = {
		
		init: function() {
			var controller = this;
			
			$scope.peerConfig = {
				key: "oftz4qdmchjxxbt9"
			};
	
			$scope.interface = {
	
				reciveData: function(data){
					controller.reciveData(data);
				}

			};
			
			$scope.send = function() {
				controller.send("hello");
			};
		
		},
		
		send: function(data) {
			$scope.interface.sendData(data);
		},
		
		reciveData: function(data) {
			alert('main ' + data);
		}
	
	};
	
	controller.init();
	
});
