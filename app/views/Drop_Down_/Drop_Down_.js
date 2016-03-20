'use strict';

var app = angular.module('JSGNSSI');

app.directive('dropDown', function () {
    return {
        restrict: 'E',
        scope: {
            dropDown: '='
        },
        replace: true,
        templateUrl: 'views/Drop_Down_/Drop_Down_.html',

        controller: [ '$scope', function ( $scope )
        {
//=============================================================================================================

            $scope.closeListener = function ()
            {
                $scope.dropDown.isActive = false;
                $scope.$apply();
                document.removeEventListener( 'click', $scope.closeListener, true );
            };

            $scope.onButtonClick = function ( event )
            {
                // console.log( 'onButtonClick' );
                $scope.dropDown.isActive = true;
                document.addEventListener( 'click', $scope.closeListener, true );
            };

            $scope.onChoiceClick = function ( choice )
            {
                if ( choice === $scope.dropDown.selectedChoice )
                    return;

                $scope.dropDown.callback( choice );
            };

//=============================================================================================================
        }],

        link: function ( scope, element, attrs )
        {
        }
    };
});
