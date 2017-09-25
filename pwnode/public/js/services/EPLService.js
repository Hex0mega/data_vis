// public/js/services/EPLService.js
angular.module('EPLService', []).factory('EPL', ['$http', function($http) {

    return {
        // call to get all epl
        get : function() {
            return $http.get('/api/epl');
        },
        
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new epl
        create : function(eplData) {
            return $http.post('/api/epl', eplData);
        },

        // call to DELETE a epl
        delete : function(id) {
            return $http.delete('/api/epl/' + id);
        }
    }       

}]);
