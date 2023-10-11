const express = require('express');
const router = express.Router();
const {
  getAllIdeas,
  getAnIdea,
  createAnIdea,
  updateIdea,
  deleteIdea,
} = require('../controllers/ideasController');

router.route('/').get(getAllIdeas).post(createAnIdea);

router.route('/:id').get(getAnIdea).put(updateIdea).delete(deleteIdea);

module.exports = router;
