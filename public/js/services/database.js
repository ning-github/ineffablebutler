muniButlerApp.factory('UserDb', function ($resource) {
  return $resource('/api/user/:id', null, {
    'update': {
      method: 'PUT'
    }
  });
});
