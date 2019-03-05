var express = require('express');
var router = express.Router();

const noteController = require('../controllers/note.controller.js');

/* GET notes listing. */
router.get('/', noteController.notes);

/* Get create a note. */
router.get('/create', noteController.create);

/**
  POST a note.
  Use express validator as middleware to validate.
*/
router.post('/create', noteController.validate('create_complete'), noteController.create_complete);

module.exports = router;
