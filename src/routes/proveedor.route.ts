import { Router } from "express";
import Proveedor from "../models/proveedor.model";
import { proveedorSchema } from "../schemas/proveedor.schema";
import { Op } from "sequelize";

const route = Router();

/**
 * @ swagger
 */
route.get("/", async (req, res) => {
  const { nombre } = req.query;
  const where: any = {};

  if (nombre) {
    where.prov_nombre = { [Op.iLike]: `%${nombre}%` };
  }

  try {
    const proveedores = await Proveedor.findAll({ where });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar proveedores." });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      res.status(400).json({ error: "El proveedor no existe." });
      return;
    }
    res.json(proveedor);
  } catch (error: any) {
    if (error.name === "SequelizeDatabaseError") {
      res.status(400).json({error: error.message}); 
      return;
    }
    res.status(500).json({ error: "Error al consultar proveedores." });
  }
});

route.post("/", async (req, res) => {
  const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }
  try {
    const nuevoProveedor = await Proveedor.create(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al crear proveedor." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      res.status(400).json({ error: "El proveedor no existe." });
      return;
    }
    if (req.body.nombre) proveedor.prov_nombre = req.body.nombre;
    if (req.body.doc_numero) proveedor.doc_numero = req.body.doc_numero;
    if (req.body.doc_tipo) proveedor.doc_tipo = req.body.doc_tipo;
    if (req.body.banco_tipo) proveedor.banco_tipo = req.body.banco_tipo;
    if (req.body.banco_nombre) proveedor.banco_nombre = req.body.banco_nombre;
    if (req.body.banco_numero) proveedor.banco_numero = req.body.banco_numero;
    if (req.body.contacto_nombre)
      proveedor.contacto_nombre = req.body.contacto_nombre;
    if (req.body.contacto_numero)
      proveedor.contacto_numero = req.body.contacto_numero;
    await proveedor.save();
    res.json(proveedor);
  } catch (error: any) {
    if (error.name == "SequelizeValidationError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al actualizar proveedor." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      res.status(400).json({ error: "El proveedor no existe." });
      return;
    }
    await proveedor.destroy();
    res.json({ mensaje: "El proveedor fue eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar proveedor." });
  }
});

export default route;
