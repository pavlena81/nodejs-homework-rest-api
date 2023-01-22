const express = require('express');

const { ctrl } = require('../../controllers');


const { authenticate, upload } = require('../../middlewares');

const router = express.Router()

router.patch("/auth/upload", authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;