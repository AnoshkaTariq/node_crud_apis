const Asset = require('../models/asset.model');

// Create and save/POST a new asset
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Create an asset
    const asset = new Asset({
        title: req.body.title || "Untitled Asset",
        content: req.body.content
    });

    // Save asset in db
    asset.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating asset"
            });
        });
};

// Retrieve/GET all assests from db
exports.findAll = (req, res) => {
    Asset.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving assets"
            });
        });
};

// Retrieve/GET a single assest with an id
exports.findOne = (req, res) => {

    Asset.findById(req.params.id)
        .then(data => {
            if (!data)
                return res.status(404).send({ message: "Not found Asset with id " + req.params.id });
            else res.send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Asset not found with id " + req.params.id
                });
            }
            res.status(500).send({
                message: "Error retrieving Asset with id=" + req.params.id
            });
        });
};

// Update/PUT a assest with an id 
exports.update = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    // Find asset and update it with id
    Asset.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
                return res.status(404).send({
                    message: `Cannot update Asset with id=${req.params.id}`
                });
            res.status(200).send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') return res.status(404).send({ message: "Asset not found with id " + req.params.id });
            res.status(500).send({ message: err.message });
        });
};

// Delete an asset with specific id
exports.delete = (req, res) => {
    Asset.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: err.message || `Cannot delete Asset with id=${req.params.id}`
                });
            } else {
                res.send({
                    message: "Asset was deleted successfully!",
                    data
                });
            }
        })
        .catch(err => {
            if (err.kind === 'ObjectId') return res.status(404).send({ message: "Asset not found with id " + req.params.id });
            res.status(500).send({ message: err.message });
        });
};

// Delete all assets from db
exports.deleteAll = (req, res) => {
    Asset.deleteMany({})
        .then(data => {
            res.status(200).send({
                message: `${data.deletedCount} Assets were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Assets."
            });
        });
};