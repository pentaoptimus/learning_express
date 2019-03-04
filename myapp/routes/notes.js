var express = require('express');
var router = express.Router();
var Note = require('../models/note.models.js');
const { validateNote } = require('../validators/notes.js');
const { isEmpty } = require('lodash');

/* GET notes listing. */
router.get('/', function(req, res, next) {
  Note.find().exec(function (err, notes) {
    if (err) return handleError(err);
    res.render('notes_list', { title: 'List notes.', notes: notes });
  });
});

/* POST a note. */
router.get('/create', function (req, res, next) {
  let errors = {};
  let formData = {};
  res.render('notes_create', { title: 'Create note.', errors: errors, formData: formData});
});

/* POST a note. */
router.post('/create', function (req, res, next) {
  let errors = {};
  return validateNote(errors, req).then(errors => {
    if (!isEmpty(errors))
    {
      res.render('notes_create', { title: 'Create notes :', errors: errors, formData: req.body});
    } else {
      const newNote = Note.build({
        title  : req.body.title,
        content: req.body.content
      });

      return newNote.save().then(result => {
        res.render('notes_list', { title: 'List notes :', notes: notes });
      });
    }
  });
  // var note = new Note({ title: 'This is title 001.', content: 'This is content 001.' });
  // note.save();

  // Note.find().exec(function (err, notes) {
  //   if (err) return handleError(err);
  //   res.render('notes_list', { title: 'List notes :', notes: notes });
  // });
});
module.exports = router;
