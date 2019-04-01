const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../helpers/middlewares');
const mongoose = require('mongoose');
const {ObjectId}= mongoose.Types;

router.get('/favoritos', async (req, res, next) => {
  const { _id } = req.session.currentUser;
  
  try {
    const oneUser = await User.findById(_id).populate("favTrips");
    console.log("holaaa",oneUser);
    if (!oneUser) {
      res.status(404);
      res.json({ mesage: 'La información del viaje no está disponible' })
      return;
    }
    res.json(oneUser);
  } catch (error) {
    next(error);
  }
});

// Añadir el viage a favoritos
router.put('/:id/addfavs', async (req, res, next) => {
  let idTrip = req.params.id;
  let {_id} = req.session.currentUser;
  try {
    const tripAddFavs = await User.findByIdAndUpdate(_id, { $push: { favTrips: ObjectId(idTrip) } }, { new: true });
    res.status(200)
    res.json({ message: 'Usuario unido' })
  } catch (error) {
    next(error)
  }

});


//Devuelve los datos del profile
router.get('/:id', async (req, res, next) => {
  // const id = req.session.currentUser._id
  const id = req.params.id
  const currentProfile = await User.findById(id)
  try {
    res.status(200);
    res.json(currentProfile)
  } catch (error) {
    next(error);
  }
});



router.put('/edit', async (req, res, next) => {
  const id = req.session.currentUser._id;
  
  const { name, username, password, newPassword, phoneNumber, imageURL } = req.body;
 
  let updateProfile ={}
  
  
  if(password && newPassword){
    if (bcrypt.compareSync(password, req.session.currentUser.password)) {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(newPassword, salt);
      updateProfile = {
        name,
        username,
        password: hashPass,
        phoneNumber,
        imageURL
       }
       try {
        const updateProfileCreated = await User.findByIdAndUpdate(id, updateProfile, {new:true});
        res.status(200)
        res.json({message: 'PerfilEditado'})
      } catch (error) {
        next(error)
      }
    }
  }
  else{
    console.log(req.body)
    updateProfile = {
      name,
      username,
      phoneNumber,
      imageURL
     }
     try {
      const updateProfileCreated = await User.findByIdAndUpdate(id, updateProfile, {new:true});
      console.log(updateProfileCreated)
      res.status(200)
      res.json({message: 'PerfilEditado'})
    } catch (error) {
      next(error)
    }
  }
  
});

module.exports = router;