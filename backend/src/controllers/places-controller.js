const { validationResult } = require('express-validator');

let { DUMMY_PLACES } = require('../data');
const HttpError = require('../models/http-error');
const Place = require('../models/place');

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

  try {
    await createdPlace.save();
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

const updatePlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => {
    p.id !== placeId;
  });
  res.status(200).json({ message: 'Deleted place.' });
};

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace };
