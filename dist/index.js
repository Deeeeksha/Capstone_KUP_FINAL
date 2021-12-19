"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Server is listening
_app["default"].listen(_app["default"].get("port"));

console.log("Server on port", _app["default"].get("port"));
console.log("Environment:", process.env.NODE_ENV);