const express = require('express');

const ctrl = require('../../controllers');


const { authenticate, upload } = require('../../middlewares');

const router = express.Router()

router.post("/auth/upload", authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;