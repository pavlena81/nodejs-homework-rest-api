const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken, ctrl.verify")

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch("/subscription", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);


module.exports = router;