const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET collection(s)
// GET request returns ALL documents in contacts collection
router.get('/', contactsController.getAll);
// GET request returns a SINGLE document in contacts collection
router.get('/:id', contactsController.getSingle);

module.exports = router;