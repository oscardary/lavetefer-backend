import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Proveedor extends Model {
  public id!: number;
  public doc_tipo!: string;
  public doc_numero!: string;
  public prov_nombre!: string;
  public banco_nombre!: string;
  public banco_tipo!: string;
  public banco_numero!: string;
  public contacto_nombre!: string;
  public contacto_numero!: string;
  //Campos estandar
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Proveedor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doc_tipo: {
      type: DataTypes.ENUM("NIT", "CC"),
      allowNull: false,
    },
    doc_numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prov_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banco_nombre: {
      type: DataTypes.STRING,
    },
    banco_tipo: {
      type: DataTypes.ENUM("Ahorros", "Corriente"),
    },
    banco_numero: {
      type: DataTypes.STRING,
    },
    contacto_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacto_numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "proveedores",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["doc_tipo", "doc_numero"],
      },
    ],
  }
);

export default Proveedor;
