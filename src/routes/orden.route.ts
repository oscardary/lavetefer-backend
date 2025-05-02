import { Router } from "express";
import Orden from "../models/orden.model";
//import { proveedorSchema } from "../schemas/proveedor.schema";
import { Op } from "sequelize";

const route = Router();

/**
 * @ swagger
 */
route.get("/", async (req, res) => {
  const { tipo_documento } = req.query;
  const where: any = {};

  if (tipo_documento) {
    where.tipo_documento = { [Op.iLike]: `%${tipo_documento}%` };
  }

  try {
    const orden = await Orden.findAll({ where });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar ordenes.", exception: error });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await Orden.findByPk(id);
    if (!orden) {
      res.status(400).json({ error: "La orden no existe." });
      return;
    }
    res.json(orden);
  } catch (error: any) {
    if (error.name === "SequelizeDatabaseError") {
      res.status(400).json({error: error.message}); 
      return;
    }
    res.status(500).json({ error: "Error al consultar orden." });
  }
});

route.post("/", async (req, res) => {
  /*const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }*/
  try {
    const nuevaOrden = await Orden.create(req.body);
    res.status(201).json(nuevaOrden);
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al crear orden." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  /*const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }*/
  try {
    const orden = await Orden.findByPk(id);
    if (!orden) {
      res.status(400).json({ error: "La orden no existe." });
      return;
    }
    if (req.body.tipo_documento) orden.tipo_documento = req.body.tipo_documento;
    if (req.body.numero_documento) orden.numero_documento = req.body.numero_documento;
    if (req.body.proveedor_cliente) orden.proveedor_cliente = req.body.proveedor_cliente;
    if (req.body.fecha_compra) orden.fecha_compra = req.body.fecha_compra;
    if (req.body.id_producto) orden.id_producto = req.body.id_producto;
    if (req.body.cantidad) orden.cantidad = req.body.cantidad;
    if (req.body.valor_unidad) orden.valor_unidad = req.body.valor_unidad;
    if (req.body.forma_pago) orden.forma_pago = req.body.forma_pago;

    await orden.save();
    res.json(orden);

  } catch (error: any) {
    if (error.name == "SequelizeValidationError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al actualizar orden." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await Orden.findByPk(id);
    if (!orden) {
      res.status(400).json({ error: "La orden no existe." });
      return;
    }
    
    await orden.destroy();
    res.json({ mensaje: "La orden fue eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar orden." });
  }
});

export default route;