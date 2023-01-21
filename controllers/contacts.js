const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // getSingle

// GET request returns ALL documents in contacts collection
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists); // no index [0] because will show all)
  });
};

// GET request returns a SINGLE document in contacts collection
// where an ID matches the ID from a query parameter.
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists[0]);// only shows one
  });
};

// POST - creates new contact
const createContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  // Validate request
  if (result.acknowledged) {
    // 201 - This code indicates that a request was successful 
    // and as a result, a resource has been created
    res.status(201).json(result);
  }
  else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
};

// PUT - updates a contact
const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  // updateOne() is used to update a single entry matching a given specified filter
  const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  // modifiedCount - return field that checks for modifications
  if (result.modifiedCount > 0) {
    res.status(200).send();
  }
};

// DELETE - delete a contact
const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  // deleteCount - return field that checks for deleted data
  if (result.deleteCount > 0) {
    res.status(200).send();
  }
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };