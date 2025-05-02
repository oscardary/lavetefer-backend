import sequelize from './config/database';
import app from './app';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
  
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('LaveteferApp Backend está lista!');
});

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa 🎉'))
    .catch((err) => console.log('Error al conectar con la base de datos 😓', err));

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));