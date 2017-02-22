(function () {
    'use strict';

    angular.module('main.module')
        .factory('timeService', timeService);

    timeService.$inject = ['$filter'];


    function timeService($filter) {
        var CELL_PERCENTAGE = 100 / 8;
        var service = {
            sortByStartTime: sortByStartTime,
            getTimeObject: getTimeObject,
            getCurrentTime: getCurrentTime,
            getPercentageFromDistance: getPercentageFromDistance,
            isShowCurrentTime: isShowCurrentTime,
            getCurrentTimeText: getCurrentTimeText
        };
        return service;

        function isShowCurrentTime(startTime, sizeHour) {
            var currentTime =  new Date();
            var hour = currentTime.getHours();
            var minute = currentTime.getMinutes();
            if(hour < startTime || hour > (startTime + sizeHour) || (hour === (startTime + sizeHour) && minute > 0)) {
                return false;
            }
            return true;
        }

        function getPercentageFromDistance(start, end, startTime, sizeHour) {
            var startTimeObject = getTimeObject(start.toString());
            var endTimeObject = getTimeObject(end);
            var rangeMinute = getTotalMinute(endTimeObject, startTime, sizeHour) - getTotalMinute(startTimeObject, startTime, sizeHour);
            return (CELL_PERCENTAGE * rangeMinute) / 60;
        }

        function getTotalMinute(time, startTime, sizeHour) {
            var hour = time.hour;
            var minute = time.minute;

            if(hour < startTime) {
                hour = startTime;
                minute = 0;
            }
            if(hour > (startTime + sizeHour) || (hour === (startTime + sizeHour) && minute > 0) ) {
                hour = startTime + sizeHour;
                minute = 0;
            }
            return hour * 60 + minute;
        }

        function sortByStartTime(jobs) {
            return $filter('orderBy')(jobs,
                function (recipe) {
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

        function getCurrentTime() {
            var date = new Date();
            return date.getHours() + ':' + date.getMinutes();
        }

        function getCurrentTimeText() {
            return $filter('date')(new Date(), 'h:mma');
        }

        function timeComparator(time1, time2) {
            if (Number.isInteger(time1.value) || Number.isInteger(time2.value)) {
                return;
            }
            var timeObject1 = getTimeObject(time1.value);
            var timeObject2 = getTimeObject(time2.value);
            return timeObject1.hour > timeObject2.hour || (timeObject1.hour == timeObject2.hour && timeObject1.minute > timeObject2.minute);
        }
    }
})();
