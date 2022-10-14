import { createCompilerHost } from 'typescript'
import Client from '../database'

export type order={
 id:number,
 user_id:number,
 status:string
}

export type orderproducts={
  id: number,
  quantity:number,
  order_id:number,
  product_id:number
 
 }
export class orderStore
{
    async index():Promise<order[]|null>
    {  try{
        const conn=await Client.connect()
        const sql ='SELECT * FROM orders'
        const res =await conn.query(sql)
        conn.release()
        return res.rows
    }
      catch(err)
      {   
          throw new Error(`unable to show orders`)
          return null
      }

    }
    async show(id:string) :Promise<order>
    {
    try{
      const conn=  await Client.connect()
      const sql='SELECT * FROM orders where id=($1)'
      const res=await conn.query(sql,[id])  
      conn.release()
      return res.rows[0]      
    }
    catch(err)
    { throw new Error (`Could not find product ${id}. Error: ${err}`)}
    }
    async create(user_id:number,status:string ):Promise<order>
    {    try{
         const conn= await Client.connect()
         const sql='INSERT INTO orders(user_id,status) Values($1,$2)RETURNING *'
         const res=await conn.query(sql,[user_id,status])
         conn.release()
         const data=res.rows[0]
      
         return res.rows[0]
    }
    catch (err)
    {
        throw new Error(`Could not add new order for user_id ${user_id}. Error: ${err}`)
    }


    }

    async addProductsToOrder(quantity:number,orderId:number,productId:number):Promise<orderproducts>
    { try{
        const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "current") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

     
     const sql='INSERT INTO orderproducts (quantity,order_id,product_id) Values ($1,$2,$3) RETURNING *'
     const res=await conn.query(sql,[quantity,orderId,productId])
     conn.release()
    
     return res.rows[0]
    }
     catch (err) {
        throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
      }
    }


    async delete(id: string): Promise<order> {
      try {
    const sql0='DELETE FROM orderproducts WHERE order_id=($1)  '   
    const conn0 = await Client.connect()
    
    const result0 = await conn0.query(sql0, [id]) 
    conn0.release()
    const sql = 'DELETE FROM orders WHERE id=($1) Returning id ,user_id,status '
    // @ts-ignore
    const conn = await Client.connect()
    
    const result = await conn.query(sql, [id])
    
    const order = result.rows[0]
    
    conn.release()
    
    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
    }

}