import { Router, Request, Response } from "express";
import Producto from "../models/producto.model";
import { productoSchema, productoIdSchema } from '../schemas/producto.schema';
import { Op } from 'sequelize';

const router = Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos disponibles
 *     description: Retorna una lista de productos con sus respectivos atributos como nombre, precio y descripción.
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *             examples:
 *               ejemploDeProductos:
 *                 summary: Lista de ejemplo
 *                 value:
 *                   - id: 1
 *                     nombre: "Galletas para perro"
 *                     precio: 15.99
 *                     descripcion: "Galletas crocantes con sabor a carne"
 *                     createdAt: "2025-04-13T15:24:00Z"
 *                     updatedAt: "2025-04-13T15:24:00Z"
 *                   - id: 2
 *                     nombre: "Champú antipulgas"
 *                     precio: 9.5
 *                     descripcion: "Limpieza profunda y protección contra pulgas"
 *                     createdAt: "2025-04-10T11:10:00Z"
 *                     updatedAt: "2025-04-11T10:45:00Z"
 *       400:
 *         description: Solicitud mal formada (por ejemplo, error en parámetros de búsqueda)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorParametros:
 *                 summary: Parámetros inválidos
 *                 value:
 *                   mensaje: "El parámetro 'precio' debe ser un número válido."
 *       500:
 *         description: Error interno del servidor al consultar los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             examples:
 *               errorServidor:
 *                 summary: Error en base de datos
 *                 value:
 *                   mensaje: "Error al consultar productos en la base de datos."
 */
router.get('/', async (req: Request, res: Response) => {
    const { nombre, precioMin, precioMax } = req.query;
    const where: any = {};

    if (nombre) {
        where.nombre = { [Op.iLike]: `%${nombre}%` } // búsqueda insensible a mayúsculas
    }
    if (precioMin || precioMax) {
        where.precio = {};
        if (precioMin) where.precio[Op.gte] = Number(precioMin);
        if (precioMax) where.precio[Op.lte] = Number(precioMax);
    }

    try {
        const productos = await Producto.findAll({ where });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar productos.' });
    }
});

router.get('/:id', async (req, res) => {
    const parseProducto = productoIdSchema.safeParse(req.params);
    if (!parseProducto.success) {
        res.status(400).json({ error: parseProducto.error.format() });
        return;
    }
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            res.status(404).json({ mensaje: 'No se encontró el producto.' })
            return;
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar el producto.' })
    }
});

/***
 * Primera versión del POST, donde se presentó un fallo con el proceso de return
 * y por esa razón se realizó la nueva versión
 */
/*
router.post('/', async(req: Request, res: Response) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
    }
    try {
        const nuevoProducto = await Producto.create(req.body);
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al insertar producto.'})
    }
});
*/

router.post('/', async (req, res) => {
    const parseProducto = productoSchema.safeParse(req.body);
    if (!parseProducto.success) {
        res.status(400).json({ error: parseProducto.error.format() });
        return;
    }
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al insertar producto.' })
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, concentracion, especie, cantidad } = req.body;

    if (!nombre || !precio) {
        res.status(400).json({ mensaje: 'Nombre y Precio son obligatorios.' });
        return;
    }
    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            res.status(400).json({ mensaje: 'Producto no encontrado.' });
            return;
        }

        producto.nombre = nombre;
        producto.concentracion = concentracion;
        producto.especie = especie;
        producto.precio = precio;
        producto.descripcion = descripcion;
        producto.cantidad = cantidad;
        await producto.save();

        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar producto.' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            res.status(400).json({ error: 'Producto no encontrado.' });
            return;
        }
        await producto.destroy();

        res.json({ mensaje: 'Ya peee!!! ... Producto eliminado' });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar producto.' });
        return;
    }
});

export default router;