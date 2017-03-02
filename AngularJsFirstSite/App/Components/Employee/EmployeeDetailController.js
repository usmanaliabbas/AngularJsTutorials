/// <reference path="../../angular.js" />
/// <reference path="../../app.module.js" />
/// <reference path="EmployeeService.js" />
//The controller is having 'employeeService' dependency.
//This controller makes call to methods from the service 

app.controller('EmployeeDetailController', function ($scope, $routeParams, $location, employeeService) {
   
    var promiseGetSingle = employeeService.get($routeParams.empId);

    promiseGetSingle.then(function (pl) {
        var res = pl.data;
        $scope.EmpNo = res.EmpNo;
        $scope.EmpName = res.EmpName;
        $scope.Salary = res.Salary;
        $scope.DeptName = res.DeptName;
        $scope.Designation = res.Designation;

        $scope.IsNewRecord = 0;
    },
    function (errorPl) {
                  console.log('failure loading Employee', errorPl);
    });

    //Clear the Scope models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.EmpNo = 0;
        $scope.EmpName = "";
        $scope.Salary = 0;
        $scope.DeptName = "";
        $scope.Designation = "";
    }

    //The Save scope method use to define the Employee object.
    //In this method if IsNewRecord is not zero then Update Employee else 
    //Create the Employee information to the server
    $scope.save = function () {
        var Employee = {
            EmpNo: $scope.EmpNo,
            EmpName: $scope.EmpName,
            Salary: $scope.Salary,
            DeptName: $scope.DeptName,
            Designation: $scope.Designation
        };
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = employeeService.post(Employee);
            promisePost.then(function (pl) {
                $scope.EmpNo = pl.data.EmpNo;
                employeeService.message = "New Record Added Successfuly";
                $location.path('/employee');
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = employeeService.put($scope.EmpNo, Employee);
            promisePut.then(function (pl) {
                employeeService.message = "Updated Successfuly";
                $location.path('/employee');
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = employeeService.delete($scope.EmpNo);
        promiseDelete.then(function (pl) {
            employeeService.message = "Deleted Successfuly";
            $scope.clear();
            $location.path('/employee');
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Back to List
    $scope.cancel = function () {        
            $scope.clear();
            $location.path('/employee');        
    }
});