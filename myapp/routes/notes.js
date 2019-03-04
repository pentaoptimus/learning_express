var express = require('express');
var router = express.Router();
var Note = require('../models/note.models.js');

/* GET notes listing. */
router.get('/', function(req, res, next) {
  Note.find().exec(function (err, notes) {
    if (err) return handleError(err);
    res.render('notes_list', { title: 'List notes.', notes: notes });
  });
});

/* POST a note. */
router.get('/create', function (req, res, next) {
  res.render('notes_create', { title: 'Create note.' });
});

/* POST a note. */
router.post('/create', function (req, res, next) {
  var note = new Note({ title: 'This is title 001.', content: 'This is content 001.' });
  note.save();

  Note.find().exec(function (err, notes) {
    if (err) return handleError(err);
    res.render('notes_list', { title: 'List notes :', notes: notes });
  });
});
module.exports = router;
