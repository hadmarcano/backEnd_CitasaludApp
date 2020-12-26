// Generic Import
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const db = require("./db/mongoose");

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const reserveRoutes = require("./routes/appointment");
const specialistRouter = require("./routes/specialist");

// App-express

const app = express();

// DB Execution Connection

db();

// Middlewares

//app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(expressValidator());
app.use(cors());

// Routes Middlewares

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", reserveRoutes);
app.use("/api", specialistRouter);

// PORT

const port = process.env.PORT || 3000;

// App Listen on Port

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
