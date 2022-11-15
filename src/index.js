import express from 'express';
import morgan from "morgan"
import cors from 'cors'
import path from 'path'
import usuariosRouter from './routes/usuarios.routes'

import './database'

const app= express();

app.set("port", process.env.PORT||4000)

app.listen(app.get('port'),()=>{
    console.log('Estoy en el puerto '+ app.get('port'));
})

// middlewares: funciones que se ejecutan antes de las rutas
// da información extra en la terminal 
app.use(morgan('dev'));
//permitir peticiones remotas
app.use(cors());
//middlewares para interpretar los objetos JSON 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//cargar un archivo estático 
app.use(express.static(path.join(__dirname, '../public')))
console.log(path.join(__dirname, '../public'));    

app.use('/apirestaurante', usuariosRouter);