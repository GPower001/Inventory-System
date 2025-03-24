import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";

dotenv.config();

const PORT = process.env.PORT || 5000; // Ensure PORT is defined before using it

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API",
            version: "1.0.0",
            description: "API Documentation for our real-time e-commerce platform",
        },
        servers: [{ url: `http://localhost:${PORT}` }], // Fixed reference to PORT
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./routes/*.js"], // Loads documentation from route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
};

export default swaggerDocs;
