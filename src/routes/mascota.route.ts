import { Router } from "express";
import Mascota from "../models/mascota.model";
//import { proveedorSchema } from "../schemas/proveedor.schema";
import { Op } from "sequelize";

const route = Router();

/**
 * @ swagger
 */
route.get("/", async (req, res) => {
  const { nombre, especie } = req.query;
  const where: any = {};

  if (nombre) {
    where.nombre = { [Op.iLike]: `%${nombre}%` };
  }
  if (especie) {
    where.especie = { [Op.iLike]: `%${especie}%` };
  }

  try {
    const mascota = await Mascota.findAll({ where });
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar mascotas.", exception: error });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      res.status(400).json({ error: "La mascota no existe." });
      return;
    }
    res.json(mascota);
  } catch (error: any) {
    if (error.name === "SequelizeDatabaseError") {
      res.status(400).json({error: error.message}); 
      return;
    }
    res.status(500).json({ error: "Error al consultar mascota." });
  }
});

route.post("/", async (req, res) => {
  /*const parseProveedor = proveedorSchema.safeParse(req.body);
  if (!parseProveedor.success) {
    res.status(400).json({ error: parseProveedor.error.format() });
    return;
  }*/
  try {
    const nuevaMascota = await Mascota.create(req.body);
    res.status(201).json(nuevaMascota);
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al crear mascota." });
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
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      res.status(400).json({ error: "La mascota no existe." });
      return;
    }
    if (req.body.propietario) mascota.propietario = req.body.propietario;
    if (req.body.nombre) mascota.nombre = req.body.nombre;
    if (req.body.especie) mascota.especie = req.body.especie;
    if (req.body.raza) mascota.raza = req.body.raza;
    if (req.body.sexo) mascota.sexo = req.body.sexo;
    if (req.body.color) mascota.color = req.body.color;
    if (req.body.complemento) mascota.complemento = req.body.complemento;
    if (req.body.fecha_nacimiento) mascota.fecha_nacimiento = req.body.fecha_nacimiento;
    if (req.body.procedencia) mascota.procedencia = req.body.procedencia;

    await mascota.save();
    res.json(mascota);

  } catch (error: any) {
    if (error.name == "SequelizeValidationError") {
      const campos = error.errors?.map((e: any) => e.path).join(", ");
      res
        .status(409)
        .json({ error: `Ya existe un registro con la misma clave: ${campos}` });
      return;
    }
    res.status(500).json({ error: "Error al actualizar mascota." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      res.status(400).json({ error: "La mascota no existe." });
      return;
    }
    
    //Si la mascota existe se debe validar si tiene ventas asociadas y no permitir la eliminación

    await mascota.destroy();
    res.json({ mensaje: "La mascota fue eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar mascota." });
  }
});

export default route;