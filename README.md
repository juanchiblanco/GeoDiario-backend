# 🌎 GeoDiario — Backend

Backend de **GeoDiario**, una aplicación web de juegos diarios de geografía.

Este proyecto proporciona una **API REST** encargada de gestionar los datos de países y generar los desafíos diarios utilizados por el frontend de GeoDiario.

---

## 🛠️ Tecnologías utilizadas

* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **JavaScript**
* **REST API**
* **CORS**
* **Morgan**
* **Git**
* **GitHub**
* **Vercel**

Para obtener y procesar información geográfica se utiliza información proveniente de **REST Countries**.

---

## 🎯 Funcionalidades

El backend se encarga principalmente de:

* 🌎 Gestionar información de países.
* 🏛️ Generar desafíos diarios de capitales.
* 🌐 Generar desafíos diarios de países.
* 🎯 Gestionar diferentes niveles de dificultad.
* 📅 Determinar el desafío correspondiente a cada día.
* 🔀 Organizar y seleccionar países para los desafíos.
* 🗄️ Almacenar y consultar información mediante MongoDB.
* 🔌 Proporcionar endpoints REST para el frontend.
* 🌐 Permitir solicitudes desde el frontend mediante CORS.

---

## 🎮 Juegos

Actualmente el backend proporciona soporte para dos juegos:

### 🏛️ Encontrá la Capital

El backend genera el desafío diario en el que el jugador debe encontrar la capital correspondiente al país seleccionado.

Endpoint:

```text
GET /api/juegos/encontra-la-capital
```

También permite especificar la dificultad:

```text
GET /api/juegos/encontra-la-capital?dificultad=normal
```

o:

```text
GET /api/juegos/encontra-la-capital?dificultad=experto
```

Una respuesta puede tener una estructura similar a:

```json
{
  "fecha": "2026-08-11",
  "juego": "encontra-la-capital",
  "dificultad": "normal",
  "ciudad": "Managua",
  "pais": "Nicaragua",
  "banderaEmoji": "🇳🇮"
}
```

---

### 🌎 Encontrá el País

El backend también genera los desafíos diarios del juego en el que el usuario debe identificar el país.

Endpoint:

```text
GET /api/juegos/encontra-el-pais
```

También acepta el parámetro de dificultad:

```text
GET /api/juegos/encontra-el-pais?dificultad=normal
```

o:

```text
GET /api/juegos/encontra-el-pais?dificultad=experto
```

---

## 🌍 Gestión de países

El backend cuenta con rutas específicas para consultar información de países.

Ruta principal:

```text
/api/paises
```

Entre las operaciones disponibles se encuentra la obtención de la lista de países.

La información se almacena y gestiona mediante **MongoDB + Mongoose**.

---

## 📅 Sistema de desafíos diarios

GeoDiario utiliza un sistema para determinar qué país corresponde a cada desafío diario.

Los desafíos están asociados a una fecha y a un juego específico.

Además, los países se organizan teniendo en cuenta diferentes niveles de dificultad.

El sistema utiliza una lógica de selección y distribución de países para evitar depender simplemente de un orden alfabético.

Esto permite generar una secuencia de desafíos diarios y distribuir los países disponibles a lo largo de diferentes ciclos.

---

## 🎯 Dificultades

Los juegos cuentan actualmente con diferentes niveles de dificultad.

La dificultad se utiliza como parámetro en las solicitudes de la API:

```text
?dificultad=normal
```

o:

```text
?dificultad=experto
```

Esto permite que el backend seleccione los desafíos correspondientes a cada categoría.

---

## 📂 Estructura del proyecto

Una estructura simplificada del backend es:

```text
backend/
├── db/
│   └── config.js
│
├── public/
│
├── server/
│   └── config.js
│
├── src/
│   ├── controllers/
│   │   ├── pais.controllers.js
│   │   ├── wordle capital/
│   │   │   └── juego.controllers.js
│   │   └── wordle pais/
│   │       └── juego.controllers.js
│   │
│   ├── data/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── index.routes.js
│   │   ├── paises.routes.js
│   │   └── juegos.routes.js
│   │
│   └── utils/
│
├── index.js
├── package.json
└── vercel.json
```

La estructura está organizada separando responsabilidades entre:

* **Routes:** definición de endpoints.
* **Controllers:** lógica de cada funcionalidad.
* **Models:** modelos de MongoDB mediante Mongoose.
* **Data:** información y datos utilizados por la aplicación.
* **Utils:** funciones auxiliares y lógica reutilizable.
* **DB:** configuración de la conexión con MongoDB.
* **Server:** configuración de Express y middleware.

---

## 🔌 API REST

Las rutas principales de la API se encuentran organizadas bajo el prefijo:

```text
/api
```

### Países

```text
GET /api/paises
```

### Juegos

```text
GET /api/juegos/encontra-la-capital
```

```text
GET /api/juegos/encontra-el-pais
```

Los endpoints de juegos permiten utilizar el parámetro:

```text
?dificultad=normal
```

o:

```text
?dificultad=experto
```

---

## 🗄️ Base de datos

El proyecto utiliza **MongoDB** como sistema de almacenamiento y **Mongoose** como ODM para trabajar con los documentos desde Node.js.

La base de datos contiene la información necesaria para:

* Países.
* Capitales.
* Dificultades.
* Información geográfica utilizada por los juegos.

La conexión con MongoDB se realiza al iniciar el servidor.

---

## 🌐 Middleware

El servidor utiliza diferentes middlewares de Express:

### CORS

Permite que el frontend pueda realizar solicitudes al backend desde un dominio diferente.

### Express JSON

Permite procesar solicitudes que contienen información en formato JSON.

### Morgan

Se utiliza para registrar las solicitudes HTTP realizadas al servidor y facilitar el seguimiento durante el desarrollo.

---

## ▶️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/juanchiblanco/GeoDiario-backend
```

Ingresar al proyecto:

```bash
cd GeoDiario-backend
```

Instalar las dependencias:

```bash
npm install
```

---

## 🚀 Ejecución

Para iniciar el backend en el entorno de desarrollo:

```bash
npm run dev
```

El servidor se ejecuta localmente y queda disponible para recibir las solicitudes del frontend.

---

## ☁️ Deploy

El backend está desplegado utilizando **Vercel**.

La arquitectura de producción de GeoDiario está separada en tres componentes principales:

```text
                    ┌─────────────────────┐
                    │      Usuario        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ GeoDiario Frontend  │
                    │       Vercel        │
                    └──────────┬──────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌─────────────────────┐
                    │ GeoDiario Backend   │
                    │       Vercel        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    └─────────────────────┘
```

El backend funciona como intermediario entre el frontend y la base de datos, proporcionando los datos y desafíos necesarios para los juegos.

---

## 🔗 Integración con el frontend

El frontend de GeoDiario consume los endpoints proporcionados por este backend mediante solicitudes HTTP.

Por ejemplo:

```text
Frontend
   ↓
GET /api/juegos/encontra-la-capital
   ↓
Backend
   ↓
Controller
   ↓
MongoDB
   ↓
Respuesta JSON
   ↓
Frontend
```

De esta manera, la lógica relacionada con la generación y obtención de los desafíos permanece en el backend, mientras que el frontend se encarga de presentarlos y gestionar la interacción con el usuario.

---

## 👨‍💻 Autor

**Juan Manuel Blanco**

Backend desarrollado para **GeoDiario**, una aplicación web de juegos diarios de geografía.

---

## 📄 Licencia

Este proyecto es de uso personal y educativo.
