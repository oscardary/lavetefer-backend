import { Router } from "express";
import Cliente from "../models/cliente.model";
//import { proveedorSchema } from "../schemas/proveedor.schema";
import { Op } from "sequelize";

const route = Router();

/**
 * @ swagger
 */
route.get("/", async (req, res) => {
  const { nombre, apellido } = req.query;
  const where: any = {};

  if (nombre) {
    where.cli_nombre = { [Op.iLike]: `%${nombre}%` };
  }
  if (apellido) {
    where.cli_apellido = { [Op.iLike]: `%${apellido}%` };
  }

  try {
    const clientes = await Cliente.findAll({ where });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar clientes.", exception: error });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      res.status(400).json({ error: "El cliente no existe." });
      return;
    }
    res.json(cliente);
  } catch (error: any) {
    if (error.name === "SequelizeDatabaseError") {
      res.status(400).json({error: error.message}); 
      return;
    }
    res.status(500).json({ error: "Error al consultar cliente." });
  }
});

route.post("/", async (req, res) => {
  /*const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }*/
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al crear cliente." });
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
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      res.status(400).json({ error: "El cliente no existe." });
      return;
    }
    if (req.body.doc_tipo) cliente.doc_tipo = req.body.doc_tipo;
    if (req.body.doc_numero) cliente.doc_numero = req.body.doc_numero;
    if (req.body.cli_nombre) cliente.cli_nombre = req.body.cli_nombre;
    if (req.body.cli_apellido) cliente.cli_apellido = req.body.cli_apellido;
    if (req.body.num_contacto1) cliente.num_contacto1 = req.body.num_contacto1;
    if (req.body.num_contacto2) cliente.num_contacto2 = req.body.num_contacto2;
    if (req.body.id_ciudad) cliente.id_ciudad = req.body.id_ciudad;
    if (req.body.direccion1) cliente.direccion1 = req.body.direccion1;
    if (req.body.direccion2) cliente.direccion2 = req.body.direccion2;
    if (req.body.observaciones) cliente.observaciones = req.body.observaciones;

    await cliente.save();
    res.json(cliente);

  } catch (error: any) {
    if (error.name == "SequelizeValidationError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al actualizar cliente." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      res.status(400).json({ error: "El cliente no existe." });
      return;
    }

    //Si el cliente existe se debe validar si tiene ventas asociadas,
    // o si tiene mascotas
    // y no permitir la eliminación

    await cliente.destroy();
    res.json({ mensaje: "El cliente fue eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente." });
  }
});

export default route;