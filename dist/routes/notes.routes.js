"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _notes = require("../controllers/notes.controller");

var _auth = require("../helpers/auth");

var router = (0, _express.Router)(); // New Note

router.get("/notes/add", _auth.isAuthenticated, _notes.renderNoteForm);
router.post("/notes/new-note", _auth.isAuthenticated, _notes.createNewNote); // Get All Notes

router.get("/notes", _auth.isAuthenticated, _notes.renderNotes); // Edit Notes

router.get("/notes/edit/:id", _auth.isAuthenticated, _notes.renderEditForm);
router.put("/notes/edit-note/:id", _auth.isAuthenticated, _notes.updateNote); // Delete Notes

router["delete"]("/notes/delete/:id", _auth.isAuthenticated, _notes.deleteNote);
var _default = router;
exports["default"] = _default;