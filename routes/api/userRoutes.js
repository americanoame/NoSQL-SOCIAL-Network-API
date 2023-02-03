const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getAllUsers)
.post(createUser); 

// /api/:userId
router.route('/:userId')
.get(getSingleUser).put(updateUser)
.delete(deleteUser);

// api/user/:userId/friends/:friendsId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
