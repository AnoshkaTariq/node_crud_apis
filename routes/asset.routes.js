module.exports = app => {
    const asset = require('../controllers/asset.controller');

    const express = require('express');
    var router = express.Router();


    // Create and save/POST a new asset
    router.post('/', asset.create);

    // Retrieve/GET all assests from db
    router.get('/', asset.findAll);

    // Retrieve/GET a single assest with an id
    router.get('/:id', asset.findOne);

    // Update/PUT a assest with an id 
    router.put('/:id', asset.update);

    // Delete an asset with specific id
    router.delete('/:id', asset.delete);

    // Delete all assets from db
    router.delete('/', asset.deleteAll);


    app.use('/assets', router);
};