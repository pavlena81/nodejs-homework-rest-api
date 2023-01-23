const express = require("express");

const { updateAvatar } = require('../../controllers/users');

const { authenticate, upload } = require('../../middlewares');

//const { upload } = require('../../middlewares/upload');

const router = express.Router();

router.patch('/avatars', authenticate,   upload.single("avatar"), updateAvatar);

module.exports = router;