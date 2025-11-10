const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

let { DUMMY_USERS } = require('../data');
const HttpError = require('../models/http-error');
const User = require('../models/user');

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

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }
  res.json({ message: 'Logged in' });
};

const getUsers = (req, res, next) => {
  res.json(DUMMY_USERS);
};

module.exports = { getUsers, signup, login };
