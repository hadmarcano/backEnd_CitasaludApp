// Generic Import
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const db = require("./db/mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(expressValidator());
app.use(cors());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Health Appointment API",
      description: "Health Appointment API Rest Server",
      contact: {
        name: "Héctor Díaz",
        url: "https://www.linkedin.com/in/hector-adolfo-diaz-marcano-ab0a27aa/",
      },
      servers: ["http://localhost:5000"],
    },
  },
  // definition the apis with swagger
  apis: ["./routes/*.js"],
};

// Final definitions with swagger-express

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
