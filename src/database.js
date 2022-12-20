import mongoose from "mongoose";

//const url = 'mongodb://localhost:27017/restaurante' // BD - LOCAL
const url = 'mongodb+srv://tafidemistol:tafidemistol2022@cluster0.8ffl46z.mongodb.net/tafidemistol'; 


mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('BD conectada')
})