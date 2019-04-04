const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const Comment = require('../models/Comment')

// const { isLoggedIn } = require('../helpers/middlewares')

// comentarios del Viaje
router.get('/:id/tripcomments', async (req, res, next) => {
  const commentsTrips = await Comment.find({ trip: req.session.currentUser._id })
  try {
    if (!commentsTrips) {
      res.status(404)
      res.json({ mesage: 'No hay comentarios' })
      return
    }
    res.json(commentsTrips)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  const { id, text } = req.body
  const { _id } = req.session.currentUser

  try {
    const newComment = {
      text,
      creator: _id,
      trip: id
    }
    const newCommentCreated = await new Comment(newComment)
    res.status(200)
    res.json(newCommentCreated)
    newCommentCreated.save()
  } catch (error) {
    next(error)
  }
//   try {
//     comment.creator = _id
//     comment.trip = id
//     const commentWritten = await Comment.create(comment)
//     // const user = await User.findById(_id)
//     // const infoResponse = [user.name, commentWritten.text]
//     res.json(infoResponse)
//   } catch (error) {
//     next(error)
//   };
})

module.exports = router
