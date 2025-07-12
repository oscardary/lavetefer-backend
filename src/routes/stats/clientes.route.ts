import { Router } from "express";
import Clientes from "../../models/cliente.model";
import { Sequelize, Op } from "sequelize";

const route = Router();

route.get("/por-ciudad", async (req, res) => {
  try {
    const result = await Clientes.findAll({
      attributes: [
        ["id_ciudad", "idCiudad"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      group: ["id_ciudad"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error en obtener totales por ciudad:", error);
    res.status(500).json({ error: "Error al obtener datos por ciudad." });
  }
});

export default route;
