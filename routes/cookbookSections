const express = require('express');
const router = express.Router();

const cookbookController = require('../controllers/cookbookSections');

router.get('/', cookbookController.getAll);

router.get('/:id', cookbookController.getSingle);

router.post('/', cookbookController.createCookbookSection);

router.put('/:id', cookbookController.updateCookbookSection);

router.delete('/:id', cookbookController.deleteCookbookSection);

module.exports = router;
