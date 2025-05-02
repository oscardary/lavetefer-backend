import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model {
    public id!: number;
    public doc_tipo!: string;
    public doc_numero!: string;
    public cli_nombre!: string;
    public cli_apellido!: string;
    public num_contacto1!: string;
    public num_contacto2!: string;
    public id_ciudad!: number;
    public direccion1!: string;
    public direccion2!: string;
    public observaciones!: string;
};

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    doc_tipo: {
        type: DataTypes.ENUM("NIT", "CC", "CE"),
        allowNull: false,
    },
    doc_numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cli_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cli_apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_contacto1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_contacto2: {
        type: DataTypes.STRING,
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        /*references: {
            model: "",
            key: "id"
        }*/
    },
    direccion1: {
        type: DataTypes.STRING,
    },
    direccion2: {
        type: DataTypes.STRING,
    },
    observaciones: {
        type: DataTypes.STRING,
    }
},{
    sequelize,
    tableName: "clientes",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["doc_tipo", "doc_numero"]
        }
    ]
});

export default Cliente;