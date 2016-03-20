'use strict';

angular.module('JSGNSSI')
.controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope )
    {
        $scope.appName = appName;

        $scope.minWindowWidth = minWindowWidth;
        $scope.minWindowHeight = minWindowHeight;

        $scope.currentView;

//vars
//=============================================================================================================
// init

        function init ()
        {
            // TODO initApp();
        }

        init();
// init
//=============================================================================================================
// view

        $scope.changeView = function ( view )
        {
            $scope.currentView = view;
        };

// view
//=============================================================================================================

        $scope.levelMenu =
        {
            isActive: false
        };

//=============================================================================================================

        $scope.debug =
        {
            isActive: false
        };

//=============================================================================================================

        $scope.confirmationPopup =
        {
            isActive: false,
            message: 'This clears and resets the grid to its default state. Are you sure you wish to proceed ?',
            callback: undefined
        };

        $scope.showConfirmPopup = function ( message, callback )
        {
            $scope.confirmationPopup.message = message;
            $scope.confirmationPopup.callback = callback;
            $scope.confirmationPopup.isActive = true;
        };

//============================================================================================================

        $scope.onOpenLayerSimActive = false;

        $scope.openLayerOnTopOfTheSim = function ()
        {
        };

        $scope.closeLayerOnTopOfTheSim = function ()
        {
        };

//============================================================================================================
    }]);
