'use strict';

var app = angular.module('JSGNSSI');

app.directive('confirmationPopup', function () {
	return {
		restrict: 'E',
		scope: true,
		replace: true,
		templateUrl: 'views/Confirmation_Popup_/Confirmation_Popup_.html',

		controller: [ '$scope', function ( $scope )
		{
			$scope.close = function ()
			{
				$scope.confirmationPopup.isActive = false;
                $scope.closeLayerOnTopOfTheSim();
			};

			$scope.$on( 'CLOSE_POPUPS', function ()
			{
				$scope.close();
			});

			$scope.onOkButtonClicked = function ()
			{
				$scope.confirmationPopup.callback();
                $scope.close();
			};
		}]
	};
});
