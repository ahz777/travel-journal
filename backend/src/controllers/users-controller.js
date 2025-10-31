const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

let { DUMMY_USERS } = require('../data');
const HttpError = require('../models/http-error');

const getUsers = (req, res, next) => {
  res.json(DUMMY_USERS);
};

const signup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, email, password } = req.body;
  const hadUser = DUMMY_USERS.find((u) => u.email === email);
  if (hadUser) {
    throw new HttpError('Email already exists.', 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.unshift(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }
  res.json({ message: 'Logged in' });
};

module.exports = { getUsers, signup, login };
