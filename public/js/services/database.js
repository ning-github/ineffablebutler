muniButlerApp.factory('Routes', function($resource){
  return $resource('/api/user/:id', null,
    {
        'update': { method:'PUT' }
    });

});