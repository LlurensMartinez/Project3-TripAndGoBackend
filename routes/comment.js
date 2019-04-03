const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

const { isLoggedIn } = require('../helpers/middlewares');

router.post('/:id/comment', requireUser, async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = { text };
    const { _id } = req.session.currentUser;

    if (!ObjectId.isValid(id)) {
        return next();
    }
    try {
        comment.creator = _id;
        comment.trip = id;
        const commentWritten = await Comment.create(comment);
        const user = await User.findById(_id);
        const infoResponse = [user.name, commentWritten.text];
        res.json(infoResponse);
    } catch (error) {
        next(error);
    };
});

module.exports = router;