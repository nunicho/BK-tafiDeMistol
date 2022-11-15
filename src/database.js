import mongoose from "mongoose";

//const url = 'mongodb://localhost:27017/restaurante' // BD - LOCAL
const url = 'mongodb+srv://tafidemistol:tafidemistol@cluster0.6dbillk.mongodb.net/db-tafidemistol'

mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('BD conectada')
})