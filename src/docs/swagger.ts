import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Lavetefer API",
        version: "1.0.0",
        description: "Documentación de la API para la gestión del negocio de mascotas LaveteferApp",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Servidor local",
        },
    ],
};

export const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: ["./src/routes/*.ts", "./src/schemas/*.ts"], // rutas donde están tus endpoints
});
  