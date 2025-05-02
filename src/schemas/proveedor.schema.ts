import { z } from "zod";

/**
 * @ swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       properties:
 */
export const proveedorSchema = z.object({
    /*doc_tipo: z.string({
        required_error: 'El tipo de documento es obligatorio.',
        invalid_type_error: 'El tipo de documento debe ser tipo texto.',
    }),*/

    doc_tipo: z.enum(["NIT","CC"]),

    doc_numero: z.string({
        required_error: 'El numero de documento es obligatorio.',
        invalid_type_error: 'El numero de documento debe ser tipo texto.',
    }),
    
    prov_nombre: z.string({
        required_error: 'El nombre de proveedor es obligatorio.',
        invalid_type_error: 'El nombre de proveedor debe ser tipo texto.',
    }).max(100, 'El nombre de proveedor solo permite 100 caracteres.'),
    
    banco_nombre: z.string({
        invalid_type_error: 'El nombre de banco debe ser tipo texto.',
    }).max(100, 'El nombre de banco solo permite 100 caracteres.').optional(),
    
    banco_tipo: z.string({
        invalid_type_error: 'El tipo de banco debe ser tipo texto.',
    }).optional(),
    
    banco_numero: z.string({
        invalid_type_error: 'El numero de cuenta bancaria debe ser tipo texto.',
    }).optional(),
    
    contacto_nombre: z.string({
        required_error: 'El nombre de contanto es obligatorio.',
        invalid_type_error: 'El nombre de contacto debe ser tipo texto.',
    }).max(100, 'El nombre de contacto solo permite 100 caracteres.'),
    
    contacto_numero: z.string({
        required_error: 'El numero de contacto es obligatorio.',
        invalid_type_error: 'El numero de contacto debe ser tipo texto.',
    })
});

export type ProveedorSchema = z.infer<typeof proveedorSchema>;