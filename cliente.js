const express = require("express"); // importamos express
const app = express();              // creamos la app
const port = 4000;                  // puerto donde corre la API

app.use(express.json()); // permite leer JSON en el body de las peticiones

// Datos simulados de clientes (como si fuera una base de datos)
let clientes = [
  { id: 1, nombre: "Constructora ABC", telefono: "3001234567" },
  { id: 2, nombre: "Ingeniería XYZ", telefono: "3109876543" }
];

// GET -> listar todos los clientes
// http://localhost:4000/clientes
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

// POST -> agregar un cliente nuevo
// http://localhost:4000/clientes
// Body en JSON:
// {
//   "nombre": "Obras del Norte",
//   "telefono": "3205551234"
// }
app.post("/clientes", (req, res) => {
  const nuevo = {
    id: clientes.length + 1,     // genera un id automático
    nombre: req.body.nombre,     // toma el nombre enviado en la petición
    telefono: req.body.telefono  // toma el teléfono enviado en la petición
  };
  clientes.push(nuevo); // lo agrega al arreglo
  res.json(nuevo);      // devuelve el cliente agregado
});

// Servidor escuchando en el puerto definido
app.listen(port, () => {
  console.log('API de clientes escuchando en http://localhost:${port}');
});