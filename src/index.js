import express from 'express';
import morgan from "morgan"
import cors from 'cors'
import path from 'path'
import productosRouter from './routes/productos.routes' 
import pedidosRouter from './routes/pedidos.routes'
import usuariosRouter from './routes/usuarios.routes'
import clientesRouter from './routes/clientes.routes'
import './database'

const app = express();



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

//rutas: nombre de dominio + ---- 
app.use('/apirestaurante/pr', productosRouter )
app.use('/apirestaurante/pe', pedidosRouter )
app.use('/apirestaurante/us', usuariosRouter)
app.use('/apirestaurante/cl', clientesRouter)

