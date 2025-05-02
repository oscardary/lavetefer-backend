import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Mascota extends Model {
    public id!: number;
    public propietario!: number;
    public nombre!: string;
    public especie!: string;
    public raza!: string;
    public sexo!: string;
    public color!: string;
    public complemento!: string;
    public fecha_nacimiento!: Date;
    public edad!: number;
    public procedencia!: string;
};

Mascota.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    propietario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "clientes",
            key: "id"
        }
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    especie:{
        type: DataTypes.ENUM("Canino","Felino","Porcino","Equino","Bovino","Otro"),
        allowNull: true,
    },
    raza:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    sexo:{
        type: DataTypes.ENUM("H","M"),
        allowNull: true,
    },
    color:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    complemento:{
        type: DataTypes.STRING,
    },
    fecha_nacimiento:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    procedencia:{
        type: DataTypes.STRING,
    },
    foto1:{
        type: DataTypes.STRING,
    }
},{
    sequelize,
    tableName: "mascotas",
    timestamps: true,
});

export default Mascota;