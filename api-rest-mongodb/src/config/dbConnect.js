import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/alura-node?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2");

let db = mongoose.connection;

export default db;
