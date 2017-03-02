/// <reference path="../../angular.js" />
/// <reference path="../../app.module.js" />
const API_PATH = 'http://localhost:39750/api/EmployeesAPI/';

app.service('employeeService', function ($http) {

    this.message = '';
    //Create new record
    this.post = function (Employee) {
        var request = $http({
            method: "post",
            url:API_PATH,
            data:  Employee
        });
        return request;
    }
    //Get Single Records
    this.get = function (EmpNo) {
        return $http.get(API_PATH + EmpNo);
    }

    //Get All Employees
    this.getEmployees = function () {
        return $http.get(API_PATH);
    }


    //Update the Record
    this.put = function (EmpNo, Employee) {
        var request = $http({
            method: "put",
            url: API_PATH + EmpNo,
            data: Employee
        });
        return request;
    }
    //Delete the Record
    this.delete = function (EmpNo) {
        var request = $http({
            method: "delete",
            url: API_PATH + EmpNo
        });
        return request;
    }

});
