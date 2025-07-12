import express from 'express';
import productoRoutes from './routes/producto.route';
import proveedorRoutes from './routes/proveedor.route';
import clienteRoutes from './routes/cliente.route';
import mascotaRoutes from './routes/mascota.route';
import ordenRoutes from './routes/orden.route';

import statsMascotas from './routes/stats/mascotas.route';
import statsClientes from './routes/stats/clientes.route';
import statsProveedores from './routes/stats/proveedores.route';

import cors from 'cors';

const app = express();

// Permitir solicitudes desde otra aplicación como el frontend
app.use(cors({
    //origin: 'http://localhost:5173' // permite solo el frontend
    origin: '*'  // (permite desde cualquier lugar — no recomendado en producción)
}));

app.use(express.json()); //Leer json del body

//Definir rutas
app.use('/api/productos', productoRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/mascota', mascotaRoutes);
app.use('/api/orden', ordenRoutes);

//Definir rutas de estadisticas
app.use('/api/stats/mascotas', statsMascotas);
app.use('/api/stats/clientes', statsClientes);
app.use('/api/stats/proveedores', statsProveedores);

export default app;