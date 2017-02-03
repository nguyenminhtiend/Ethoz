(function () {
    'use strict';

    angular.module('main.module')
        .factory('utilityService', utilityService);

    utilityService.$inject = ['$filter'];

    function utilityService($filter) {
        var service = {
            sortByStartTime: sortByStartTime,
            getTimeObject: getTimeObject
        };
        return service;

        function sortByStartTime(jobs) {
            return $filter('orderBy')(jobs,
                function(recipe) {
                    return recipe.startTime;
                }, false, timeComparator
            );
        }

        function getTimeObject(time) {
            var timeArray = time.split(':');
            var object = {
                hour: parseInt(timeArray[0])
            };
            object.minute = timeArray.length > 1 ? parseInt(timeArray[1]) : 0;
            return object;
        }

        function timeComparator(time1, time2) {
            if(Number.isInteger(time1.value) || Number.isInteger(time2.value)){
                return;
            }
            var timeObject1 = getTimeObject(time1.value);
            var timeObject2 = getTimeObject(time2.value);
            return timeObject1.hour > timeObject2.hour ||  (timeObject1.hour == timeObject2.hour && timeObject1.minute > timeObject2.minute);
        }
    }
})();
