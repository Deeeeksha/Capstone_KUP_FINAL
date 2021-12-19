"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = require("../controllers/users.controller");

var router = (0, _express.Router)(); // Routes

router.get("/users/signup", _users.renderSignUpForm);
router.post("/users/signup", _users.singup);
router.get("/users/signin", _users.renderSigninForm);
router.post("/users/signin", _users.signin);
router.get("/users/logout", _users.logout);
var _default = router;
exports["default"] = _default;