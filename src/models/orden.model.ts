import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Orden extends Model {
    public id!: number;
    public tipo_documento!: string; // (lista de selección unico valor: compra, venta)
    public numero_documento!: string;
    public proveedor_cliente!: number; // (FK)
    public fecha_compra!: Date; 
    public id_producto!: number; // (FK)
    public cantidad!: number;
    public valor_unidad!: number;
    public forma_pago!: string; // (lista de selección unico valor: efectivo, transferencia)
    //Campos estandar
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

Orden.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_documento: {
        type: DataTypes.ENUM("Compra","Venta"),
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proveedor_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //references (FK): no se definen ya que una FK 
        // no puede apuntar a dos tabla y necesitaria 
        // hacerlo contra Proveedores y Clientes
        // Esta validación se va a controlar desde el Backend
    },
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "productos",
            key: "id"
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_unidad: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    forma_pago: {
        type: DataTypes.ENUM("Efectivo","Transferencia"),
        allowNull: false
    }
},
{
    sequelize,
    tableName: 'ordenes',
    timestamps: true,
});

export default Orden;