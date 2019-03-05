var Note = require('../models/note.models.js');
// require express validator
const { check, validationResult } = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'create_complete': 
        {
            return [
                check('title')
                    .not()
                    .isEmpty()
                    .withMessage('The title is empty.'),
                check('title')
                    .isLength({ min: 5 })
                    .withMessage('The title is asleast 5 chacracters.'),
                check('content').not().isEmpty().withMessage('The content is empty.')
            ];
        }
    }
}

/* GET notes listing. */
exports.notes = function (req, res, next) {
    Note.find().exec(function (err, notes) {
        if (err) return handleError(err);
        res.render('notes_list', { title: 'List notes.', notes: notes });
    });
};

/* Get create a note. */
exports.create = function (req, res, next) {
    return res.render('notes_create', { title: 'Create note.', errors: {}, formData: req.body });
};

/* POST a note. */
exports.create_complete = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('notes_create', { title: 'Create note.', errors: errors.array(), formData: req.body });
    }
    //save note
    const { title, content } = req.body;
    Note.create({
        title,
        content
    }).then(() => {
        return res.redirect('/notes');
    });
};

/* Get Edit a note. */
exports.edit = function (req, res, next) {
    return res.render('notes_edit', { title: 'Edit note.', errors: {}, formData: req.body });
};

/* PUT a note. */
exports.edit_complete = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('notes_edit', { title: 'Edit note.', errors: errors.array(), formData: req.body });
    }
    //save note
    const { id, title, content } = req.body;
    var condition = { _id: id };
    var updateData = { title: title, content: content };
    Note
        .where(condition)
        .update({ $set: updateData })
        .then(() => {
            return res.redirect('/notes');
        });
};