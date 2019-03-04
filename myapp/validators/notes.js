let validator = require('validator');
const note = require('../models/note.models.js');

const validateCreateNoteFields = function (errors, req) {
    if(!validator.isEmpty(req.body.title)) {
        errors['title'] = 'Please enter title !';
    }

    if(!validator.isEmpty(req.body.content)) {
        errors['content'] = 'Please enter content !';
    }
}

exports.validateNote = function (errors, req) {
    return new Promise(function(resolve, reject) {
        validateCreateNoteFields(errors, req);
        return note.findOne({
            where: {
                title: req.body.title
            }
        }).then(result => {
            if (result !== null) {
                errors['title'] = 'Title is ready in use !';
            }
            resolve(errors);
        });
    });

}