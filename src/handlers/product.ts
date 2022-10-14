import Express,{Request,Response}  from "express";
import { product,productStore } from "../models/product";
import jwt from 'jsonwebtoken'

const productstore =new productStore()

const index= async(_req :Request, res:Response) =>{
    try{
    const products=await productstore.index()
    res.json(products)
    }
    catch(err)
{  res.status(400)
    res.json(err)}
}

const show =async (req:Request,res:Response)=>{
    try{
    const product =await productstore.show(req.params.id)
    res.json(product)
      }  catch(err)
{  res.status(400)
    res.json(err)}
}



const create= async (req:Request,res:Response)=>
{ 
    try {
        const authorizationHeader = req.headers.authorization 
        if(authorizationHeader !==undefined)
      {const token = authorizationHeader.split(' ')[1] 
        jwt.verify(token, process.env.TOKEN_SECRET||"")}
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }try
    {
  const  name:string=req.body.name
  const  price:number= req.body.price

    const product= await productstore.create(name,price)
    res.json(product)


}
catch(err)
{  res.status(400)
    res.json(err)}
}

const ProductRoutes=(app:Express.Application)=>{

    app.get('/products',index)
    app.get('/products/:id',show)
    app.post('/products',create)

}
export default ProductRoutes