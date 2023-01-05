const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const {contacts: ctrl} = require('../../controllers')

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.delete('/:id', ctrl.removeById);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;
