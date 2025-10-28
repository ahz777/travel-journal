const express = require("express");
const { DUMMY_PLACES } = require("../data");

const router = express.Router();

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creatorId === userId;
  });
  res.json({ place });
});

module.exports = router;
