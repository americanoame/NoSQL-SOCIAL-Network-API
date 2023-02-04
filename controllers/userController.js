const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
// {objectId} = ("mongoose")

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Getting a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        return User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));

    },

    updateUser(req, res) {
        // what im trying to do is ...
        User.findOneAndUpdate(
            (ObjectId(req.params.userId),
                { $set: req.body },
                { new: true })
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })

    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    addFriend(req, res) {
        return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })

    },

    deleteFriend(req, res) {
        return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )

            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }

}




