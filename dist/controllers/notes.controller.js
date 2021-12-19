"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.renderNotes = exports.renderNoteForm = exports.renderEditForm = exports.deleteNote = exports.createNewNote = void 0;

var _Note = _interopRequireDefault(require("../models/Note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderNoteForm = function renderNoteForm(req, res) {
  res.render("notes/new-note");
};

exports.renderNoteForm = renderNoteForm;

var createNewNote = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, title, description, errors, newNote;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description;
            errors = [];

            if (!title) {
              errors.push({
                text: "Please Write a Title."
              });
            }

            if (!description) {
              errors.push({
                text: "Please Write a Description"
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 8;
              break;
            }

            res.render("notes/new-note", {
              errors: errors,
              title: title,
              description: description
            });
            _context.next = 14;
            break;

          case 8:
            newNote = new _Note["default"]({
              title: title,
              description: description
            });
            newNote.user = req.user.id;
            _context.next = 12;
            return newNote.save();

          case 12:
            req.flash("success_msg", "Note Added Successfully");
            res.redirect("/notes");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNewNote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNewNote = createNewNote;

var renderNotes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var notes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Note["default"].find({
              user: req.user.id
            }).sort({
              date: "desc"
            }).lean();

          case 2:
            notes = _context2.sent;
            res.render("notes/all-notes", {
              notes: notes
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderNotes(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.renderNotes = renderNotes;

var renderEditForm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var note;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Note["default"].findById(req.params.id).lean();

          case 2:
            note = _context3.sent;

            if (!(note.user != req.user.id)) {
              _context3.next = 6;
              break;
            }

            req.flash("error_msg", "Not Authorized");
            return _context3.abrupt("return", res.redirect("/notes"));

          case 6:
            res.render("notes/edit-note", {
              note: note
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renderEditForm(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.renderEditForm = renderEditForm;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context4.next = 3;
            return _Note["default"].findByIdAndUpdate(req.params.id, {
              title: title,
              description: description
            });

          case 3:
            req.flash("success_msg", "Note Updated Successfully");
            res.redirect("/notes");

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNote(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNote = updateNote;

var deleteNote = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Note["default"].findByIdAndDelete(req.params.id);

          case 2:
            req.flash("success_msg", "Note Deleted Successfully");
            res.redirect("/notes");

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteNote(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNote = deleteNote;