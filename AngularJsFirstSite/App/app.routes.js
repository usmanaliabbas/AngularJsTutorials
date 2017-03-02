/// <reference path="angular.js" />
/// <reference path="app.module.js" />

(function () {
    
    app.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    //================================================
    // Routes
    //================================================
    $routeProvider.when('/employee', {
        templateUrl: 'App/Components/Employee/EmployeeList.html',
        controller: 'EmployeeListController'
    }).when('/employee/:empId', {
        templateUrl: 'App/Components/Employee/EmployeeDetails.html',
        controller: 'EmployeeDetailController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

})();
