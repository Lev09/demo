angular.module('app', [])
.controller('appController', function($scope) {
	
	$scope.peerConnection = {
		key: 'oftz4qdmchjxxbt9',
		
		reciveData: function(data){
			alert('iframe1 ' + data);
		}
		
	};
	
});
