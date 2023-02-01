const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
         .getDb()
         .db("cookbookSections")
         .collection('cookbookSections')
         .find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
         .getDb()
         .db("cookbookSections")
         .collection('cookbookSections')
         .find({ _id: userId});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch {
        res.status(500).json({err});
    }
};

const createCookbookSection = async (req, res) => {
    try {
        const cookbookSection = {
            sectionName: req.body.sectionName,
            sectionDescription: req.body.sectionDescription,
            sectionType: req.body.sectionType
        };

        const response = await mongodb
         .getDb()
         .db("cookbookSections")
         .collection('cookbookSections')
         .insertOne(cookbookSection);
        if (response.acknowledged) {
            res.status(201).json(response);
        }
        else {
            res.status(500).json(response.error || 'An error occurred while creating the cook book section.');
        }
    } catch {
        res.status(500).json({err});
    }
};

const updateCookbookSection = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const cookbookSection = {
            sectionName: req.body.sectionName,
            sectionDescription: req.body.sectionDescription,
            sectionType: req.body.sectionType
        };

        const response = await mongodb
         .getDb()
         .db("cookbookSections")
         .collection('cookbookSections')
         .replaceOne({_id: userId}, updateCookbookSection);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
        else {
            res.status(500).json(response.error || 'An error occurred while updating the cook book section');
        }
    } catch {
        res.status(500).json({err});
    }
};

const deleteCookbookSection = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
         .getDb()
         .db("cookbookSections")
         .collection('cookbookSections')
         .deleteOne({_id: userId}, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(200).send();
        }
        else {
            res.status(500).json(response.error || 'An error occurred while deleting the cook book section');
        }
    } catch {
        res.status(500).json({err});
    }
}

module.exports = {getAll, getSingle, createCookbookSection, updateCookbookSection, deleteCookbookSection};