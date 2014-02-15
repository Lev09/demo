angular.module('app')
.controller('controller', function($scope) {
	
	$scope.peerTransfer = {
		
		reciveData: function(data){
			//your code
			alert('iframe1'+ data);
		}
		
	};
	
});
