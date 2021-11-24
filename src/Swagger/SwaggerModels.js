const path = require("path");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Store Products",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
  },

  apis: [`${path.join(__dirname, "routes/productRoute.js")}`],
};
module.exports = swaggerSpec;
