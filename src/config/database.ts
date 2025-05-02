import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// 1. Crear la instancia primero
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    logging: false,
});

// 2. Exportarla (antes de que los modelos la necesiten)
export default sequelize;

// 3. Luego importar los modelos que la usan
import '../models'; //Importar todos los modelos

// 4. Finalmente sincronizar
sequelize.sync({alter: true}) //Ajusta la tabla si cambian los modelos y sin perder datos
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch((err) => console.log('Error sincronizando los modelos:', err))

