const express = require("express");
const morgan = require("morgan");
const userRoute = require("./Routes/user");

//! Importaciones de Archivos Externos
require("./Conection/mongodb");

//! Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require("./Swagger/SwaggerModels");
require("./models/userSchema");

//! settings
const app = express();
app.set("port", process.env.PORT || 9000);
app.use(morgan("dev"));

//! middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoute);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

//! server listening
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
