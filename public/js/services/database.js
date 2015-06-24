muniButlerApp.factory('UserDb', function ($resource) {
  return $resource('/api/user/', null, {
    'update': {
      method: 'PUT'
    }
  });
});
