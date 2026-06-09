(function () {
  var _promise = null;

  window.getUser = function () {
    if (!_promise) {
      _promise = fetch('controllers/auth/me.php')
        .then(function (r) { return r.json(); })
        .then(function (j) { return j.data || { loggedIn: false }; })
        .catch(function () { return { loggedIn: false }; });
    }
    return _promise;
  };

  window.clearUser = function () {
    _promise = null;
  };
}());
