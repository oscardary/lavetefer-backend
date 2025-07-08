import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Galletas para perro
 *         precio:
 *           type: number
 *           format: float
 *           example: 15.99
 *         descripcion:
 *           type: string
 *           example: Galletas crocantes con sabor a carne
 *         cantidad:
 *           type: number
 *           format: float
 *           example: 30000.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-13T15:24:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-13T15:24:00Z
 */
export const productoSchema = z.object({
    nombre: z.string({
        required_error: '=( El nombre es obligatorio.',
        invalid_type_error: '=( El nombre debe ser un texto.'
    }).min(2, { message: '=( El nombre debe tener al menos 2 caracteres.'}),

    precio: z.number({
        required_error: '=( El precio es obligatorio.',
        invalid_type_error: '=( El precio debe ser un numero.'
    }).positive({ message: '=( El precio deber ser positivo.'}),

    cantidad: z.number({
        required_error: '=( La cantidad es obligatoria.',
        invalid_type_error: '=( La cantidad debe ser un numero.'
    }).positive({ message: '=( La cantidad deber ser positiva.'}),

    descripcion: z.string({
        invalid_type_error: '=( La descripción debe ser un texto.'
    }).max(255, 'La descripción solo permite 255 caracteres.').optional()

});

export type ProductoSchema = z.infer<typeof productoSchema>;

/**
 * @swagger
 * parameters:
 *   ProductoIdParam:
 *     in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 *       pattern: '^\d+$'
 *     description: ID numérico del producto
 *     example: "123"
 */
export const productoIdSchema = z.object({
    id: z.string().regex(/^\d+$/, { message: 'El ID debe ser un numero.' })
});