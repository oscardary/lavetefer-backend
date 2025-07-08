import { faker } from "@faker-js/faker";

import sequelize from "../config/database";

import Proveedor from "../models/proveedor.model";
import Cliente from "../models/cliente.model";
import Mascota from "../models/mascota.model";
//import Orden from '../models/orden.model';
//import Producto from '../models/producto.model';

import ciudadesJson from "../data/colombia_ciudades.json";

const tiposDocumentoPersona = ["NIT", "CC", "CE"];
const tiposDocumentoEmpresa = ["NIT", "CC"];
const ciudades = ciudadesJson.map((c) => c.codigo);
const sexo = ["M", "H"];
const especie = ["Canino", "Felino", "Porcino", "Equino", "Bovino", "Otro"];
const banco_tipo = ["Ahorros", "Corriente"];
const razas_especie = [
    {
        especie: "Canino",
        razas: [
            "Pastor Alemán",
            "Gran Danés",
            "Chihuahua",
            "Labrador Retriever",
            "Bulldog Francés",
            "Husky Siberiano",
            "Beagle",
            "Dálmata",
            "Shih Tzu",
            "Pug",
            "Criollo",
        ],
    },
    {
        especie: "Felino",
        razas: [
            "Bengalí",
            "Maine Coon",
            "Siames",
            "Persa",
            "Sphynx",
            "British Shorthair",
            "Ragdoll",
            "Abisinio",
            "Bombay",
            "Azul Ruso",
            "Criollo",
        ],
    },
    {
        especie: "Porcino",
        razas: [
            "Large White",
            "Pietrain",
            "Duroc",
            "Landrace",
            "Berkshire",
            "Hampshire",
            "Mangalica",
            "Meishan",
        ],
    },
    {
        especie: "Equino",
        razas: [
            "Árabe",
            "Cuarto de Milla",
            "Percherón",
            "Frisón",
            "Appaloosa",
            "Mustang",
            "Criollo",
            "Pura Sangre Inglés",
        ],
    },
    {
        especie: "Bovino",
        razas: [
            "Holstein",
            "Jersey",
            "Angus",
            "Hereford",
            "Limousin",
            "Brahman",
            "Simmental",
            "Normando",
        ],
    },
];

const telefonoCol = (): string => {
    const formatos = ["3## ### ####", "(60#) ### ####"];
    const formatoElegido = faker.helpers.arrayElement(formatos);
    return faker.helpers.replaceSymbols(formatoElegido);
};

async function seed() {
    console.log("Hola soy Seed");

    if (process.env.NODE_ENV !== "development") {
        console.error("Este script solo debe ejecutarse en desarrollo.");
        process.exit(1);
    }

    await sequelize.sync({
        force: false, //true: Borra todo y lo recrea
    });

    for (let i = 1; i <= 40; i++) {
        //Mapear datos aleatorios para PROVEEDOR
        const proveedor = await Proveedor.create({
            doc_tipo: faker.helpers.arrayElement(tiposDocumentoEmpresa),
            doc_numero: faker.string.numeric({
                length: faker.number.int({ min: 7, max: 10 }),
            }),
            prov_nombre: faker.company.name(),
            banco_nombre: faker.finance.accountName(),
            banco_tipo: faker.helpers.arrayElement(banco_tipo),
            banco_numero: faker.finance.accountNumber(),
            contacto_nombre: faker.person.fullName(),
            contacto_numero: telefonoCol(),
        });

        //Mapear datos aleatorios para CLIENTE
        const cliente = await Cliente.create({
            doc_tipo: faker.helpers.arrayElement(tiposDocumentoPersona),
            doc_numero: faker.string.numeric({
                length: faker.number.int({ min: 7, max: 10 }),
            }),
            cli_nombre: faker.person.firstName(),
            cli_apellido: faker.person.lastName(),
            num_contacto1: telefonoCol(),
            num_contacto2: telefonoCol(),
            id_ciudad: faker.helpers.arrayElement(ciudades),
            direccion1: faker.location.streetAddress(),
            direccion2: faker.location.streetAddress(),
        });

        //Mapear dato aleatorios para MASCOTA
        const mascota_especie = faker.helpers.arrayElement(razas_especie);
        const mascota_raza = faker.helpers.arrayElement(mascota_especie.razas);

        const mascota = await Mascota.create({
            propietario: faker.number.int({ min: 1, max: i }).toString(),
            nombre: faker.animal.petName(),
            especie: mascota_especie.especie,
            raza: mascota_raza,
            sexo: faker.helpers.arrayElement(sexo),
            color: faker.color.human(),
            //complemento: faker.animal.petName(),
            fecha_nacimiento: faker.date.between({
                from: faker.date.past({ years: 15 }),
                to: new Date(),
            }),
        });
    }

    console.log("Base de datos poblada con datos de prueba.");
    process.exit();
}

seed();
