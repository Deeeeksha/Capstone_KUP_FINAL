"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singup = exports.signin = exports.renderSigninForm = exports.renderSignUpForm = exports.logout = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderSignUpForm = function renderSignUpForm(req, res) {
  return res.render("users/signup");
};

exports.renderSignUpForm = renderSignUpForm;

var singup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, _req$body, name, email, password, confirm_password, emailUser, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = [];
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password;

            if (password != confirm_password) {
              errors.push({
                text: "Passwords do not match."
              });
            }

            if (password.length < 4) {
              errors.push({
                text: "Passwords must be at least 4 characters."
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 8;
              break;
            }

            res.render("users/signup", {
              errors: errors,
              name: name,
              email: email,
              password: password,
              confirm_password: confirm_password
            });
            _context.next = 24;
            break;

          case 8:
            _context.next = 10;
            return _User["default"].findOne({
              email: email
            });

          case 10:
            emailUser = _context.sent;

            if (!emailUser) {
              _context.next = 16;
              break;
            }

            req.flash("error_msg", "The Email is already in use.");
            res.redirect("/users/signup");
            _context.next = 24;
            break;

          case 16:
            // Saving a New User
            newUser = new _User["default"]({
              name: name,
              email: email,
              password: password
            });
            _context.next = 19;
            return newUser.encryptPassword(password);

          case 19:
            newUser.password = _context.sent;
            _context.next = 22;
            return newUser.save();

          case 22:
            req.flash("success_msg", "You are registered.");
            res.redirect("/users/signin");

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function singup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.singup = singup;

var renderSigninForm = function renderSigninForm(req, res) {
  return res.render("users/signin");
};

exports.renderSigninForm = renderSigninForm;

var signin = _passport["default"].authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
});

exports.signin = signin;

var logout = function logout(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

exports.logout = logout;