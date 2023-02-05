// const mongoose = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
    getAllThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Getting a single user by its _id and populated thought and friend data
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)

            )
            .catch((err) => res.status(500).json(err));

    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })

            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No thought with this id!' })

                    : res.json('thought was created')
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });

    },

    updateThought(req, res) {

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    deleteThought(req, res) {
        return User.findOneAndRemove
            ({ _id: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
            .then((Thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json({ massage: "thought was deleted" })
            )
            .catch((err) => res.status(500).json(err));

    },

    createReaction(req, res) {
        console.log(req.body)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToset: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                 !thought 
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

}




