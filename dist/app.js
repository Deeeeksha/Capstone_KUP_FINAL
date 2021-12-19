"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _morgan = _interopRequireDefault(require("morgan"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _createUser = require("./libs/createUser");

var _config = _interopRequireDefault(require("./config"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _notes = _interopRequireDefault(require("./routes/notes.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

require("./config/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var app = (0, _express["default"])();
(0, _createUser.createAdminUser)(); // settings

app.set("port", _config["default"].PORT);
app.set("views", _path["default"].join(__dirname, "views"));
app.engine(".hbs", (0, _expressHandlebars["default"])({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  extname: ".hbs"
}));
app.set("view engine", ".hbs"); // middlewares

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _methodOverride["default"])("_method"));
app.use((0, _expressSession["default"])({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].MONGODB_URI
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _connectFlash["default"])()); // Global Variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
}); // routes

app.use(_index["default"]);
app.use(_users["default"]);
app.use(_notes["default"]); // static files

app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use(function (req, res) {
  res.render("404");
});
var _default = app;
exports["default"] = _default;