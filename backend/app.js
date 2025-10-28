const express = require("express");
const morgan = require("morgan");
const placesRoutes = require("./src/routes/places-routes");
const usersRoutes = require("./src/routes/users-routes");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/places", placesRoutes);
app.use(usersRoutes);

app.listen(5000);
