const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought); 

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId/reactions')
.post(createReaction);

// api/thought/:thoughtId/reactions/reactions
router.route('/:thoughtId/reactions/:reactionsId')
.delete(deleteReaction);


module.exports = router;
