import Express,{Request,Response}  from "express";
import { order,orderproducts,orderStore} from '../models/orders';
import jwt from 'jsonwebtoken'


const orderstore =new orderStore()

const index= async(req :Request, res:Response) =>{
    try {
        const authorizationHeader = req.headers.authorization 
        if(authorizationHeader !==undefined)
      {const token = authorizationHeader.split(' ')[1] 
        jwt.verify(token, process.env.TOKEN_SECRET||"")}
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
    const orders=await orderstore.index()
    res.json(orders)
        }  catch(err)
    {  res.status(400)
        res.json(err)
}
}
const show =async (req:Request,res:Response)=>{
    try {
        const authorizationHeader = req.headers.authorization 
        if(authorizationHeader !==undefined)
      {const token = authorizationHeader.split(' ')[1] 
        jwt.verify(token, process.env.TOKEN_SECRET||"")}
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
    const order =await orderstore.show(req.params.id)
    res.json(order)
}  catch(err)
{  res.status(400)
    res.json(err)
}

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
    }
    try
    {
  const  user_id:number=req.body. user_id
  const  status:string= req.body.status

    const order= await orderstore.create( user_id,status)
    res.json(order)


}
catch(err)
{  res.status(400)
    res.json(err)}
}

const addproductsToOrder =async(req:Request,res:Response)=>
{ 
    try {
        const authorizationHeader = req.headers.authorization 
        if(authorizationHeader !==undefined)
      {const token = authorizationHeader.split(' ')[1] 
        jwt.verify(token, process.env.TOKEN_SECRET||"")
               }
    

   const quantity:number= req.body.quantity
   const product_id:number=req.body.product_id
   const order_id:number=req.body.order_id
 
   const order = await orderstore.addProductsToOrder(quantity,order_id,product_id)
    res.json(order)

}
  catch (err)
  {  res.status(400)
    res.json(err)}
}
const orderRoutes=(app:Express.Application)=>{

    app.get('/orders',index)
    app.get('/orders/:id',show)
    app.post('/orders',create)

 // add product
    app.post('/orders/:id/products', addproductsToOrder)
}
export default orderRoutes