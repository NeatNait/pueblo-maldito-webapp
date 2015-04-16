'use strict';

angular.module('puebloMalditoWebappApp')
  .directive('detailList', function () {
    return {
      templateUrl: function(element, attrs){
        var template = attrs.template || 'detail';
        return 'components/detailList/' + template + 'List.html';
      },
      restrict: 'E',
      scope: {
        showControls: '=showControls',
        elements: '=elements',
        editFn: '=edit',
        deleteFn: '=delete'
      },
      controller: function($scope, $element, $window){

        $scope.delete = function(element) {
          var deleteElement = $window.confirm('Are you absolutely sure you want to delete?');
          if (deleteElement) {
            element.$remove();
            angular.forEach($scope.elements, function(u, i) {
              if (u === element) {
                $scope.elements.splice(i, 1);
              }
            });
            $scope.deleteFn();
          }
        };

        $scope.edit = $scope.editFn;

      }/*,
      link: function (scope, element, attrs) {
      }*/
    };
  });