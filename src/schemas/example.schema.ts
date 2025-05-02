// schemas/producto.schema.ts
import { z } from "zod";

export const productoBaseSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  precio: z.number().positive("El precio debe ser mayor que cero"),
  descripcion: z.string().max(200, "Máximo 200 caracteres").optional(),
});

// Para crear: todos obligatorios excepto descripción
export const productoCreateSchema = productoBaseSchema;

// Para editar: todos opcionales pero con reglas
export const productoUpdateSchema = productoBaseSchema.partial();

// Para filtros por query:
export const productoQuerySchema = z.object({
  nombre: z.string().optional(),
  precioMin: z.coerce.number().optional(),
  precioMax: z.coerce.number().optional(),
});

// Para validar el ID en los params
export const productoIdSchema = z.object({
  id: z.string().uuid("ID no válido"),
});