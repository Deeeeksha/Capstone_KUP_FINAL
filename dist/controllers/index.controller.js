"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderIndex = exports.renderAbout = void 0;

var renderIndex = function renderIndex(req, res) {
  res.render("index");
};

exports.renderIndex = renderIndex;

var renderAbout = function renderAbout(req, res) {
  res.render("about");
};

exports.renderAbout = renderAbout;