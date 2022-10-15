import express from 'express'
const ProductRouter = express.Router()
import Product from '../models/productModel.js'


ProductRouter.get('/', async (req,res) => {
    const products = await Product.find();
    res.send(products);
});

ProductRouter.get('/slug/:slug', async (req,res) => {
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product Not Found'})
    }
})

ProductRouter.get('/api/products/:id', async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.send(404).status({message: 'Product Not Found'})
    }
})

export default ProductRouter;