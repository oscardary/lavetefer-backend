import { Router } from "express";
import Proveedores from "../../models/proveedor.model";
import { Sequelize, Op } from "sequelize";

const route = Router();

route.get("/por-naturaleza", async (req, res) => {
  try {
    const result = await Proveedores.findAll({
      attributes: [
        ["doc_tipo", "tipoDocumento"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      group: ["doc_tipo"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error en obtener totales por tipo documento:", error);
    res.status(500).json({ error: "Error al obtener datos por tipo documento." });
  }
});

export default route;
