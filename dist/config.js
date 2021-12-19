"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

// Read environment variables
(0, _dotenv.config)();
var configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "notes-app",
  MONGODB_URI: "mongodb://".concat(process.env.MONGODB_HOST || "localhost", "/").concat(process.env.MONGODB_DATABASE || "notes-app")
};
var _default = configurations;
exports["default"] = _default;