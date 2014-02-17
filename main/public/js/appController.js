angular.module('app', [])
.controller('controller', function($scope) {
	
	$scope.peerConnection = {	

		reciveData: function(data){
			alert('main ' + data);
		}

	};
	
	$scope.send = function() {
		$scope.peerConnection.sendData("hello!");
	};

});
