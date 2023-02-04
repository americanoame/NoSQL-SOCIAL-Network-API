const { ObjectId } = require('mongoose').Types;
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
            .then((thoughtDb) => {
                console.log(thoughtDb)
                if (!thoughtDb) {
                return res.status(404).json({ message: 'No thought with this id!' })
                }
                console.log(thoughtDb)   
                res.json(thoughtDb)
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { userName: req.body.thoughtId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })

            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No thought with this id!' })

                    : res.json('thought was create')
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
        Thought.findOneAndRemove
        ({ _id: req.params.thoughtId })
            .then((user) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(user)
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
            .then((thought) => {
                if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' })
                }
                    
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndDelete({ _id: req.params.userId }, 
            { $pull: { reactions:  { reactionId: req.params.reactionId } } }, 
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

}




