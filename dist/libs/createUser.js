"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdminUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createAdminUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var userFound, newUser, admin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findOne({
              email: "admin@localhost"
            });

          case 2:
            userFound = _context.sent;

            if (!userFound) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            newUser = new _User["default"]({
              username: "admin",
              email: "admin@localhost"
            });
            _context.next = 8;
            return newUser.encryptPassword("adminpassword");

          case 8:
            newUser.password = _context.sent;
            _context.next = 11;
            return newUser.save();

          case 11:
            admin = _context.sent;
            console.log("Admin user created", admin);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAdminUser() {
    return _ref.apply(this, arguments);
  };
}();

exports.createAdminUser = createAdminUser;