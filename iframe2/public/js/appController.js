angular.module('app', [])
.controller('controller', function($scope) {
	
	$scope.peerConnection = {
		
		reciveData: function(data){
			alert('iframe2 ' + data);
		}
		
	};
	
});
