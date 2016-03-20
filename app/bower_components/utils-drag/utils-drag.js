'use strict';

//    event
//    eventType - 'dragStart', 'drag', 'dragStop'
//    pos - absolute pos,
//    returnCallback

var app = angular.module('utilsDrag', []);

app.directive('utilsDrag', function ( ) {
    return {
        restrict: 'A',
        scope:
        {
            dragCallback: '&utilsDrag'
        },
        replace: true,

        controller: [ '$scope', '$rootScope', function ( $scope )
        {
            window.ud = $scope;

            $scope.dragElement = U;
            $scope.dragStartPosition = U;

            $scope.returnCallback = function ()
            {
                $scope.dragElement.css( $scope.dragStartPosition );
            }

        }],

        link: function ( scope, element )
        {
            var cursorTop = $(element).height() / 2;
            var cursorLeft = $(element).width() / 2;

            function getCursorPosition ( topLeft, event )
            {
//				console.log( 'event: ', event );
//				var eventPos = getEventPos( event );

                var x = event.pageX;
                var y = event.pageY;

                return { x: x, y: y };
            }

            $(element).draggable(
                {
                    cursorAt:
                    {
                        top: cursorTop,
                        left: cursorLeft
                    },

                    start: function ( event, ui )
                    {
                        scope.dragElement = $(this);
                        scope.dragElement.css('pointer-events', 'none');

                        var startDragging = scope.dragCallback(
                            {
                                event: event,
                                eventType: 'dragStart',
                                pos: getCursorPosition( ui.position, event ),
                                returnCallback: scope.returnCallback
                            });

                        scope.dragStartPosition = ui.position;

                    },

                    drag: function( event, ui )
                    {
                        var drag = scope.dragCallback(
                            {
                                event: event,
                                eventType: 'drag',
                                pos: getCursorPosition( ui.position, event ),
                                returnCallback: scope.returnCallback
                            });

                        if ( drag )
                            return false;
                    },

                    stop: function ( event, ui )
                    {
                        var stopDragging = scope.dragCallback(
                            {
                                event: event,
                                eventType: 'dragStop',
                                pos: getCursorPosition( ui.position, event ),
                                returnCallback: scope.returnCallback
                            });

                        scope.dragElement.css('pointer-events', 'all');
                    }
                });
        }
    };
});