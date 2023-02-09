const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
    //must have info - rules
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email', // email@gmail.com
    favoriteColor: 'required|string',
    birthday: 'string'
  };
  //validation
  validator(req.body, validationRule, {}, (err, status) => {
    // if fails
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } 
    // if succeeds
    else {
      next();
    }
  });
};

module.exports = {
  saveContact
};