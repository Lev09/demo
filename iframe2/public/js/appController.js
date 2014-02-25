angular.module('app', [])
.controller('appController', function($scope) {
	
	var controller = {
		
		interface: {

			reciveData: function(data) {
				controller.reciveData(data);
			}

		},
		
		init: function() {
			var controller = this;	
			$scope.interface = this.interface;
			
			$scope.send = function() {
				controller.send("hello");
			};
		
		},
		
		send: function(data) {
			$scope.interface.sendData(data);
		},
		
		reciveData: function(data) {
			alert('iframe2 ' + data);
		}
	
	};
	
	controller.init();
	
});
