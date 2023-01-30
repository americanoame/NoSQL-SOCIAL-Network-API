const router = require('express').Router();
const {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/thoughtController');

// /api/users
router.route('/')
.get(getAllUser)
.post(createUser); 

// /api/users/:userId
router.route('/:thoughtId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// api/users/:usersId/friends/:friendsId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
