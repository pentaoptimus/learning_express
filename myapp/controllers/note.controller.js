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
        case 'edit_complete': 
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
        res.render('notes_list', { title: 'List notes.', notes: notes, errors: {} });
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
    var _id = req.params._id;
    Note
        .find({ _id: _id })
        .exec(function (err, note) {
            if (err) return handleError(err);
            return res.render('notes_edit', { title: 'Edit note.', errors: {}, formData: note[0], _id: _id});
        });
};

/* PUT a note. */
exports.edit_complete = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('notes_edit', { title: 'Edit note.', errors: errors.array(), formData: req.body, _id: req.body._id });
    }
    //save note
    const { title, content } = req.body;
    var condition = { _id: req.params._id };
    var updateData = { title: title, content: content };
    Note
        .where(condition)
        .update({ $set: updateData })
        .then(() => {
            return res.redirect('/notes');
        });
};

/* DELETE a note. */
exports.delete = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        Note.find().exec(function (err, notes) {
            if (err) return handleError(err);
            res.render('notes_list', { title: 'List notes.', notes: notes, errors: errors.array() });
        });
    }
    Note.deleteOne({ _id: req.params._id }, function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        return res.redirect('/notes');
    });
};

/* Get detail of a note. */
exports.detail = function (req, res, next) {
    var _id = req.params._id;
    Note
        .find({ _id: _id })
        .exec(function (err, note) {
            if (err) return handleError(err);
            return res.render('notes_detail', { title: 'Detail note.', errors: err, formData: note[0] });
        });
};