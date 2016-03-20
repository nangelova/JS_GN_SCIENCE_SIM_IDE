'use strict';

var app = angular.module('JSGNSSI');

app.directive('topBar', function ()
{
    return {
        restrict: 'E',
        scope: false,
        replace: true,
        templateUrl: 'views/Top_Bar_/Top_Bar_.html',

        controller: [ '$rootScope', '$scope', function ( $rootScope, $scope )
        {
			window.tb = $scope;

//======================================================================================================================
// level button

            $scope.onLevelButtonClicked = function ()
            {
                $scope.levelMenu.isActive = true;

                $scope.openLayerOnTopOfTheSim();
            };

// level button
//======================================================================================================================

        }]
    };
});
