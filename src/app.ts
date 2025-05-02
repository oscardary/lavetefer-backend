import express from 'express';
import productoRoutes from './routes/producto.route';
import proveedorRoutes from './routes/proveedor.route';
import clienteRoutes from './routes/cliente.route';
import mascotaRoutes from './routes/mascota.route';
import ordenRoutes from './routes/orden.route';

const app = express();

app.use(express.json()); //Leer json del body

//Definir rutas
app.use('/api/productos', productoRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/mascota', mascotaRoutes);
app.use('/api/orden', ordenRoutes);

export default app;