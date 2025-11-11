const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');

const createPlace = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data.', 422);
    return next(error);
  }

  const { title, description, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    address,
    creator,
    image: 'https://placehold.co/400',
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session: session });
    user.places.push(createdPlace);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a place.', 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find a place for the provided id.', 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a place.', 500);
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError('Could not find a place for the provided user id.', 404);
    return next(error);
  }

  res.json({ places: places.map((place) => place.toObject({ getters: true })) });
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data.', 422);
    return next(error);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update place.', 500);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError('Updating place failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findByIdAndDelete(placeId);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not delete a place.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace };
