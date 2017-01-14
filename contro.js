/**
 * Created by admin on 2016/12/22.
 */
angular.module('fApp').controller("con1",function ($scope,$http) {
    $http.get('my.json').success(function (DataAll) {
        $scope.DataAll=DataAll.content_body;
        $scope.navdata=DataAll.navtitle;
        $scope.sidebar=DataAll.sidebarfirst;
       
    }).error(function (DataAll) {
        console.log("aaa");
    });
    
})