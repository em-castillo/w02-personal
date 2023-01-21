const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET collection(s)
// GET request returns ALL documents in contacts collection
router.get('/', contactsController.getAll);
// GET request returns a SINGLE document in contacts collection
router.get('/:id', contactsController.getSingle);

// week 03
// POST request
router.post('/', contactsController.createContact);
// PUT request/ uses id to be specific and don't mess up info
router.put('/:id', contactsController.updateContact);
// DELETE request/ uses id to be specific
router.delete('/:id', contactsController.deleteContact);


module.exports = router;