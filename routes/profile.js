const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../helpers/middlewares');


//Devuelve los datos del profile
router.get('/', async (req, res, next) => {
  const id = req.session.currentUser._id
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
  console.log(password, newPassword)
  if(password && newPassword){
    if (bcrypt.compareSync(password, req.session.currentUser.password)) {
      console.log("contraseña editada")
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
    console.log("contraseña no editada")
    updateProfile = {
      name,
      username,
      phoneNumber,
      imageURL
     }
     try {
       console.log("holaaaaa")
      const updateProfileCreated = await User.findOneAndUpdate(id, updateProfile, {new:true});
      res.status(200)
      res.json({message: 'PerfilEditado'})
    } catch (error) {
      next(error)
    }
  }
  
});

module.exports = router;