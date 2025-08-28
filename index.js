//inbetario
import express from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const inventory = ["dos metos de tela amarilla", "tres metros de tela verde ", "cinco metros de tela azul"];
let nextId = 1; 
// Middleware para validar el ID
function validateId(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    req.id = id;
    next();
}   

// Obtener todos los productos
app.get('/inventory', (req, res) => {
    res.json(inventory);
});
// Obtener un producto por ID
app.get('/inventory/:id', validateId, (req, res) => {
    const product = inventory.find(p => p.id === req.id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});
// Agregar un nuevo producto
app.post('/inventory', (req, res) => {
    const { name, quantity, price } = req.body;
    if (!name || quantity == null || price == null) {
        return res.status(400).json({ error: 'Faltan datos del producto' });
    }
    const newProduct = { id: nextId++, name, quantity, price };
    inventory.push(newProduct);
    res.status(201).json(newProduct);
});

// Actualizar un producto por ID            

app.put('/inventory/:id', validateId, (req, res) => {

    const product = inventory.find(p => p.id === req.id);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const { name, quantity, price } = req.body;
    if (name != null) product.name = name;
    if (quantity != null) product.quantity = quantity;
    if (price != null) product.price = price;
    res.json(product);

});
// Eliminar un producto por ID
app.delete('/inventory/:id', validateId, (req, res) => {
    const index = inventory.findIndex(p => p.id === req.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const deletedProduct = inventory.splice(index, 1);
    res.json(deletedProduct[0]);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
//inbetario
 app.post('/inventory', (req, res) => {
    const{name} = req.body;
    if(!name){
        return res.status(404).json({error: 'Faltan datos del producto'});

    }
    else{
        inventory.push(name);
        res.status(201).json({message: 'Producto agregado', inventory});
    }
});