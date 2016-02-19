/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function projectParams(params) {
  var safeParams = ['name'];
  var result = {}
  
  if (params) {
    safeParams.forEach(function (el) {
      result[el] = params[el];
    });
  }
  
  return result;
}

module.exports = {
	// create: function (req, res) {
  //   Project.create()
  // }
};

