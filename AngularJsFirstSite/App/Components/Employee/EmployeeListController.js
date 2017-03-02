/// <reference path="../../angular.js" />
/// <reference path="../../app.module.js" />
/// <reference path="EmployeeService.js" />
//The controller is having 'EmployeeService' dependency.
//This controller makes call to methods from the service 

app.controller('EmployeeListController', function ($scope, $location, employeeService) {

    $scope.IsNewRecord = 1; //The flag for the new record
    $scope.Message = employeeService.message;
    loadRecords(); 

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = employeeService.getEmployees(); //The MEthod Call from service

        promiseGet.then(function (pl) {
            $scope.Employees = pl.data;
            $scope.Message
        },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (Emp) {
        $location.path('/employee/' + Emp.EmpNo);
    }
    
});