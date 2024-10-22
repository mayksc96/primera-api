import express from "express"

const app = express()
const port = 3000;
app.use(express.json())

/*app.get("/users", (req, res)=>{
    res.json({message: "obtener usuarios registrados"})
})

app.get("/user", (req, res)=>{
    res.json({message: "mayk suarez"})
})


app.post("/user", (req, res)=>{
    const {body} = req;
    if ("username" in body){
        return res.json({message: `usuario creado ${body.username}`})
        
    }else {
        return res.json({message: "usuario no creado",error: true})
    }
})

app.patch("/user", (req, res)=>{
    res.json({message: "actualizar numero de telefono de usuario"})
})

app.put("/user", (req, res)=>{
    res.json({message: "cambiar todo el usuario"})
})

app.delete("/user", (req, res)=>{
    res.json({message: "eliminar usuario"})
})


app.listen(3000)


*/



let usuarios = []; // Simulación de base de datos en memoria

// Endpoint para crear usuarios (POST)
app.post('/usuarios', (req, res) => {
    const { username, gmail, dependencia } = req.body;

    if (!username || !gmail || !dependencia) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Simulación de creación de usuario
    const nuevoUsuario = {
        id: Date.now(), // Genera un ID único temporal
        username,
        gmail,
        dependencia
    };

    usuarios.push(nuevoUsuario); // Añadir el nuevo usuario a la lista
    res.status(201).json({
        message: 'Usuario creado con éxito',
        usuario: nuevoUsuario
    });
});

// Endpoint para obtener todos los usuarios o uno en particular (GET)
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
});

// Endpoint para actualizar un usuario completo (PUT)
app.put('/usuarios/:id', (req, res) => {
    const { username, gmail, dependencia } = req.body;
    const usuario = usuarios.find(u => u.id == req.params.id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!username || !gmail || !dependencia) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Actualizar usuario completamente
    usuario.username = username;
    usuario.gmail = gmail;
    usuario.dependencia = dependencia;

    res.json({
        message: 'Usuario actualizado con éxito',
        usuario
    });
});

// Endpoint para actualizar un usuario parcialmente (PATCH)
app.patch('/usuarios/:id', (req, res) => {
    const { username, gmail, dependencia } = req.body;
    const usuario = usuarios.find(u => u.id == req.params.id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar campos parciales si existen en la petición
    if (username) usuario.username = username;
    if (gmail) usuario.gmail = gmail;
    if (dependencia) usuario.dependencia = dependencia;

    res.json({
        message: 'Usuario actualizado parcialmente',
        usuario
    });
});

// Endpoint para eliminar un usuario (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    const usuarioIndex = usuarios.findIndex(u => u.id == req.params.id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuarios.splice(usuarioIndex, 1); // Eliminar usuario de la lista

    res.json({
        message: 'Usuario eliminado con éxito'
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});