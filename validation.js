// import express-validator modules
const { check } = require('express-validator');
 
exports.infoValidation = [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('favoriteColor', 'Favorite color is required').not().isEmpty(),
    check('birthday', 'Birthday mus be in this format mm/dd/yyyy').isDate()
]
 
