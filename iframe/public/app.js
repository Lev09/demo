angular.module('app', [])
.controller('controller', function($scope) {
	
	$scope.peerTransfer = {
		
		reciveData: function(data){
			alert('iframe1 '+ data);
		}
		
	};
	
});
