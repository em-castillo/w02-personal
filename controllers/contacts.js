const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // getSingle

// GET request returns ALL documents in contacts collection
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
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
    res.status(200).json(lists[0]);// only shows one
  });
};

module.exports = { getAll, getSingle };