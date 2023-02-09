const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // getSingle

// GET request returns ALL documents in contacts collection
const getAll = async (req, res, next) => {
  // try and catch to avoid site to crash
  try{
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists); // no index [0] because will show all)
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// GET request returns a SINGLE document in contacts collection
// where an ID matches the ID from a query parameter.
const getSingle = async (req, res, next) => {
// validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to find a contact.');
  }
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists[0]);// only shows one
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// POST - creates new contact
const createContact = async (req, res, next) => {
  try{
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
} catch (err){
  res.status(500).json({message: err.message} || 'Some error occurred. Contacts was not created.');
}
};

// PUT - updates a contact
const updateContact = async (req, res, next) => {
  // validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to update a contact.');
  }
  try{
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
  // handling errors
  // modifiedCount - return field that checks for modifications
  if (result.modifiedCount > 0) {
    // 204 - There is no content to send for this request
    res.status(204).send();
  }
} catch (err){
  res.status(500).json({message: err.message} || 'Some error occurred. Contact was not updated.');
}
};

// DELETE - delete a contact
const deleteContact = async (req, res, next) => {
  // validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid contact id to delete a contact.');
  }
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  // handling errors
  // deleteCount - return field that checks for deleted data
  if (result.deleteCount > 0) {
    // 200 - The request succeeded. The result meaning of "success" depends on the HTTP method
    res.status(200).send();
  }
} catch (err){
  res.status(500).json({message: err.message} || 'Some error occurred. Contact was not deleted.');
}
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };