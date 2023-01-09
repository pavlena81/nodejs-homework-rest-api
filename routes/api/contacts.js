
const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/contact');

//const {contacts: ctrl} = require('../../controllers')
const router = express.Router()

router.get('/', authenticate, ctrl.getAll); 

router.get('/:id', authenticate, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete('/:id', authenticate, ctrl.removeById);

router.put('/:id', authenticate, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;
