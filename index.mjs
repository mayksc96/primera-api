import express from "express"

const app = express()

app.use(express.json())

app.get("/users", (req, res)=>{
    res.json({message: "obtener un usuarios"})
})

app.get("/user", (req, res)=>{
    res.json({message: "obtenemos un usuario especifico"})
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



