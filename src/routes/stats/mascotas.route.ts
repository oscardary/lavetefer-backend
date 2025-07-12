import { Router } from "express";
import Mascotas from "../../models/mascota.model";
import { Sequelize, Op } from "sequelize";

const route = Router();

route.get("/por-especie", async (req, res) => {
  try {
    const result = await Mascotas.findAll({
      attributes: [
        ["especie", "especie"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      group: ["especie"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error en obtener totales por especie:", error);
    res.status(500).json({ error: "Error al obtener datos de especies." });
  }
});

route.get("/sexo-por-especie", async (req, res) => {
  try {
    const result = await Mascotas.findAll({
      attributes: [
        ["especie", "especie"],
        ["sexo", "sexo"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      group: ["especie", "sexo"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error en obtener totales de sexo por especie:", error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de sexo por especies." });
  }
});

route.get("/sexo-por-especie/:especie", async (req, res) => {
  const { especie } = req.params;
  const where: any = {};

  if (especie) {
    where.especie = { [Op.eq]: `${especie}`};
  }

  try {
    const result = await Mascotas.findAll({
      where,
      attributes: [
        ["especie", "especie"],
        ["sexo", "sexo"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"],
      ],
      group: ["especie", "sexo"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.error("Error en obtener totales de sexo por especie:", error);
    res
      .status(500)
      .json({ error: "Error al obtener datos de sexo por especies." });
  }
});

export default route;
