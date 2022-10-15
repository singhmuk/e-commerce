import express from "express";
const app = express();

import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./data.js"
import seedRouter from "./routes/seedRoutes.js";
import ProductRouter from "./routes/productRoutes.js";

dotenv.config();

app.use('/api/seed', seedRouter);
app.use('/api/products', ProductRouter);

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to DB')
}).catch(err => {
    console.log(err)
})

app.get('/api/products', (req,res) => {
    res.send(data.products)
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})