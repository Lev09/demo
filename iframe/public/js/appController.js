angular.module('app', [])
.controller('appController', function($scope) {
	
	$scope.interface = {
		key: 'oftz4qdmchjxxbt9',
		
		reciveData: function(data){
			alert('iframe1 ' + data);
		}
		
	};
	
});
