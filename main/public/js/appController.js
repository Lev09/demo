angular.module('app', [])
.controller('appController', function($scope) {
	
	var controller = {
		
		init: function() {
			var controller = this;
			
			$scope.peerConfig = {
				key: "oftz4qdmchjxxbt9",
				
				onError: function(error) {
					alert(error.message);
				}
				
			};
	
			$scope.interface = {
	
				reciveData: function(data){
					controller.reciveData(data);
				}

			};
			
			$scope.send = function() {
				$scope.interface.sendData("hello");
			};
			
			$scope.destroy = function() {
				$scope.peerConfig.destroy();
			};
			
			$scope.disconnect = function() {
				$scope.peerConfig.disconnect();
			};
		
		},
		
		reciveData: function(data) {
			alert('main ' + data);
		}
	
	};
	
	controller.init();
	
});
