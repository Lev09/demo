angular.module('app', [])
.controller('controller', function($scope) {
	
	$scope.peerTransfer = {	

		reciveData: function(data){
			alert('main ' + data);
		}

	};
	
	$scope.send = function() {
		$scope.peerTransfer.sendData("hello!");
	};

});
