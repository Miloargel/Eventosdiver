const router = require('express').Router();

router.use("/user", require ("./api/user.routes"));
router.use("/", require ("./api/events.routes"));

module.exports = router;