import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import productosRouter from "./routes/productos.routes";
import pedidosRouter from "./routes/pedidos.routes";
import usuariosRouter from "./routes/usuarios.routes";
import clientesRouter from "./routes/clientes.routes";
import "./database";

const app = express();

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
console.log(path.join(__dirname, "../public"));

app.use("/apirestaurante/pr", productosRouter);
app.use("/apirestaurante/pe", pedidosRouter);
app.use("/apirestaurante/us", usuariosRouter);
app.use("/apirestaurante/cl", clientesRouter);
