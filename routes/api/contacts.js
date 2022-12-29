const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.add);

// router.delete('/:id', ctrl.delContact);

// router.put('/:id', ctrl.updatesById);

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
