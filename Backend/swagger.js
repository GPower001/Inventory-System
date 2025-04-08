import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API",
            version: "1.0.0",
            description: "API Documentation for our real-time e-commerce platform",
        },
        servers: [{ url: process.env.PORT|| "http://localhost:5000" }], 
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
    console.log(`Swagger Docs available at https://${process.env.PORT || "http://localhost:5000"}/api-docs`);
};

export default swaggerDocs;