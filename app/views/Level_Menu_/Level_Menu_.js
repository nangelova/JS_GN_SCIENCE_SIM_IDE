'use strict';

var app = angular.module('JSGNSSI');

app.directive('levelMenu', function () {
	return {
		restrict: 'E',
		scope: true,
		replace: true,
		templateUrl: 'views/Level_Menu_/Level_Menu_.html',

		controller: [ '$scope', '$rootScope', function ( $scope, $rootScope )
		{
            $scope.year = copyRightYear;

			$scope.closeLevelMenu = function ()
			{
				$scope.levelMenu.isActive = false;
                $scope.closeLayerOnTopOfTheSim()
			};

			$scope.onBackButtonClicked = function ()
			{
				$scope.closeLevelMenu();
			};

			$scope.onFullScreenGrayClicked = function ()
			{
				$scope.closeLevelMenu();
			};

			$scope.onSignOutClicked = function ()
			{
				$scope.logout();
				$scope.closeLevelMenu();
			};

			$scope.onLevelItemClicked = function ( level, levelId )
			{
				//console.log( 'LEVEL_ITEM_CLICKED: ', level.levelName );
//				$scope.selectLevel( levelId );
//				$scope.closeLevelMenu();
//				$scope.reset();
			};

            $scope.isLevelSelected = function (levelId)
            {
                return $scope.selectedLevelId === levelId;
            };
		}]
	};
});
