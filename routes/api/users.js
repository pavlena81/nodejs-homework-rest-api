const express = require('express');

const { ctrl } = require('../../controllers/users');


const { authenticate, upload } = require('../../middlewares');

//const { upload } = require('../../middlewares/upload');

const router = express.Router()

router.patch('/avatars', authenticate,   upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;