/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function _getError(errors) {
  var keys = Object.keys(errors);
  
  return errors[keys[0]][0];
}

module.exports = {
	index: function (req, res) {
    User.find().exec(function (err, users) {
      if (err) {
        req.badRequest();
      } else {
        res.view('user/index', { users: users });
      }
    });
  },
  
  create: function (req, res) {
    var userParams = this._userParams(req.body.user);
    var _this = this;
    
    User.create(userParams).exec(function (err, user) {
      if (err) {
        if (err.ValidationError) {
          res.view('user/new', { user: user, error: _getError(err.invalidAttributes) });
          return;
        }
        
        res.badRequest();
      } else {
        res.redirect('/user/' + user.id);
      }
    });
  },
  
  show: function (req, res) {
    User.findOne({ id: req.params.id }).exec(function (err, user) {
      if (err || !user) {
        res.notFound();
      } else {
         res.view('user/show', { user: user });
      }
    });
  },
  
  update: function (req, res) {
    User.update({ id: req.params.id }, this._userParams(req.body.user)).exec(function (err, user) {
      if (user) {
        res.redirect('/user/' + user.id);
      } else {
        res.badRequest();
      }
    })
  },
  
  edit: function (req, res) {
    User.findOne({ id: req.params.id }).exec(function (err, user) {
      if (user) {
        res.view('user/edit', { user: user });
      } else {
        res.notFound();
      }
    });
  },
  
  destroy: function (req, res) {
    User.destroy({ id: req.params.id }).exec(function (err, user) {
      if (err) {
        res.badRequest();
      } else {
        console.log(123);
        res.redirect('/user');
      }
    });
  },
  
  _userParams: function (params) {
    var safeParams = ['name'];
    var result = {}
    
    if (params) {
      safeParams.forEach(function (el) {
        result[el] = params[el];
      });
    }
    
    return result;
  }
};