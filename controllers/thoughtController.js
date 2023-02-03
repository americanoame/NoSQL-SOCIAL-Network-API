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
        Thought.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { userName: req.body.username },
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
             req.body, 
            { new: true })

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
        Thought.findOneByIAndDelete(ObjectId(req.params.thoughtId))
            .then((user) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    createReaction(req, res) {
        return Thought.findOneAndAdd(
            { _id: req.params.ThoughtId },
            { $addToset: { reaction: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    deleteReaction(req, res) {
        Thought.findOneAnddelete({ _id: req.params.userId }, { $addToset: { reactionId: req.params.reactionId } }, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },


    // addFriend(req, res) {
    //     User.findOneAndAdd({ _id: req.params.userId }, { $addToset: { friends: req.params.friendId } }, { new: true })


    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No user with this id!' })
    //                 : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
    


    // delete(req, res) {
    //     User.findOneAnddelete({ _id: req.params.userId }, { $addToset: { friends: req.params.friendId } }, { new: true }
    //     )

    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No user with this id!' })
    //                 : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // }

}




