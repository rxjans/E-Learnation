const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const User = require("../models/user.model")

router.get('/profile', async (req, res, next) => {
  // console.log(req.user);
  const person = req.user;
  res.render('profile', { person });
});

router.get('/teacher', async (req, res, next) => {
  // console.log(req.user);
  res.render('teacher');
});
router.get('/jee', async (req, res, next) => {
  // console.log(req.user);
  res.render('jee');
});
router.get('/gate', async (req, res, next) => {
  // console.log(req.user);
  res.render('gate');
});
router.get('/quiz', async (req, res, next) => {
  // console.log(req.user);
  res.render('quiz');
});
router.get('/computer_courses', async (req, res, next) => {
  // console.log(req.user);
  res.render('computer_courses');
});
router.get('/notes', async (req, res, next) => {
  // console.log(req.user);
  res.render('notes');
});
router.get('/Project', async (req, res, next) => {
  // console.log(req.user);
  res.render('Project');
});
router.get('/project1', async (req, res, next) => {
  // console.log(req.user);
  res.render('project1');
});

// router.get('/users', async (req, res, next) => {
//   try {
//     const users = await User.findOne({email:person.email});
//     // res.send(users);
//     res.render('users', { users });
//   } catch (error) {
//     next(error);
//   }
// });
router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/user/users');
      return;
    }}catch (error) {
      {
        next(error);
      }
    }});


module.exports = router;
