import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Producto extends Model {
    public id!: number;
    public ean!: string;
    public nombre!: string;
    public descripcion?: string;
    public precio!: number;
    public cantidad!: number;
    public concentracion!: string;
    public especie!: string;
    public recordatorio!: boolean;
    //FOTO
    //Campos estandar
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Producto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ean: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    concentracion: {
        type: DataTypes.STRING,
    },
    especie: {
        type: DataTypes.ENUM("Canino","Felino","Porcino","Equino","Bovino","Otro"),
        allowNull: false
    },
    recordatorio: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    sequelize,
    tableName: 'productos',
    timestamps: true,
});

export default Producto;