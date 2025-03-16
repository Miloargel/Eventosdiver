const router = require('express').Router();
const {
  add,
  updateEvent,
  deleteEvent,
  getAll,
  addUserToEvent,
} = require('../../controllers/events.controller');

router.post('/add', add);
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);
router.get('/list', getAll);
router.put('/updateuser', addUserToEvent);

module.exports = router;
