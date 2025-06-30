# 🐾 LaVeteFerApp - Backend

Sistema de gestión administrativa para LaVeteFer, un negocio orientado al bienestar de las mascotas.  
Este backend expone una API RESTful para gestionar clientes, proveedores, mascotas, órdenes y recordatorios.

---

## 🚀 Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **Sequelize** (ORM)
- **PostgreSQL** (Neon.tech)
- **Zod** (validación de datos)
- **Swagger UI** (documentación interactiva)
- **Jest / Supertest** (pruebas - opcional)
- **Dotenv** (variables de entorno)
- **Git** (versionado)

---

## 📌 Endpoints principales

Todos los endpoints están documentados en Swagger:

> 🔗 http://localhost:3000/api-docs

### Clientes

| Método | Ruta               | Descripción                    |
|--------|--------------------|--------------------------------|
| GET    | /clientes          | Listar todos los clientes      |
| GET    | /clientes/:id      | Obtener cliente por ID         |
| POST   | /clientes          | Crear nuevo cliente            |
| PUT    | /clientes/:id      | Actualizar cliente             |
| DELETE | /clientes/:id      | Eliminar cliente               |

### Proveedores, Mascotas, Órdenes, Recordatorios

Se manejan de forma similar, con CRUD completo y relaciones entre tablas (FK).

---

## 🔄 Relaciones entre entidades

- **Mascota** → pertenece a un **Cliente**
- **Órden** → asociada a un **Cliente**, opcionalmente una **Mascota**
- **Recordatorio** → para una **Mascota**
- **Proveedores** → entidades externas para productos o servicios

---

## 🧪 Validación

Todas las rutas que reciben datos (`POST`, `PUT`) se validan con **Zod**.  
Esto garantiza integridad de datos, formatos correctos y errores claros.

Ejemplo de esquema:

export const clienteSchema = z.object({
  doc_tipo: z.string().min(1),
  doc_numero: z.string().min(5),
  cli_nombre: z.string().min(2),
  cli_apellido: z.string().min(2),
});

---

## 🛠 Instalación y ejecución

### 1. Clonar repositorio
git clone https://github.com/tuusuario/lavetefer-backend.git
cd lavetefer-backend

### 2. Instalar dependencias
npm install

### 3. Configurar variables de entorno
Crea un archivo .env basado en el ejemplo:
PORT=3000
DATABASE_URL=postgres://usuario:clave@neon.tech/tu_db

### 4. Ejecutar en desarrollo
npm run dev

### 5. Ver documentación Swagger
http://localhost:3000/api-docs
