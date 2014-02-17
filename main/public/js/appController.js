angular.module('app', [])
.controller('appController', function($scope) {
	
	$scope.peerConnection = {
		key: 'oftz4qdmchjxxbt9',
		
		reciveData: function(data){
			alert('main ' + data);
		}

	};
	
	$scope.send = function() {
		$scope.peerConnection.sendData("hello!");
	};

});
