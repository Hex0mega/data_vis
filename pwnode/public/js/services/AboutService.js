angular.module('AboutService', []).factory('About', ['$http', function($http) {

    return {
        // call to get all about
        get : function() {
            return $http.get('/api/about');
        },
        
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new about
        create : function(aboutData) {
            return $http.post('/api/about', aboutData);
        },

        // call to DELETE an about
        delete : function(id) {
            return $http.delete('/api/about/' + id);
        }
    }       

}]);
