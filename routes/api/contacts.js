const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.delete('/:id', ctrl.removeById);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateContact);


module.exports = router;
