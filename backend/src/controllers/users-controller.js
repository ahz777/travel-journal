const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data.', 422);
    return next(error);
  }

  const { name, email, password, places } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later', 500);
    return next(error);
  }

  if (existedUser) {
    const error = new HttpError('User exists already, please login instead.', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: 'https://placehold.co/400',
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later', 500);
    return next(error);
  }

  if (!existedUser || existedUser.password !== password) {
    const error = new HttpError('Invalid credentials, could not log you in.', 401);
    return next(error);
  }
  res.json({ message: 'Logged in' });
};

module.exports = { getUsers, signup, login };
