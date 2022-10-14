import Client from '../database'

export type product =
{
  id:number,
  name:string,
  price:number
};

export class productStore
{
    async index():Promise <product[]>
    { try{
        const  conn= await Client.connect()
        const  sql= 'SELECT * FROM products  '
        const res = await conn.query(sql);
        const products :product[]= res.rows
        conn.release()
        return products
    }
    catch(err)
    {
        throw new Error (`Could not get products. Error: ${err}`);
        
    }
    }

    async show(id:string) :Promise<product>
    {
    try{
      const conn=  await Client.connect()
      const sql='SELECT * FROM products where id=($1) '
      const res=await conn.query(sql,[id])  
      conn.release()
      return res.rows[0]      
    }
    catch(err)
    { throw new Error (`Could not find product ${id}. Error: ${err}`)}
    }

    async create(name:string,price:number):Promise<product>
    {    try{
         const conn= await Client.connect()
         const sql='INSERT INTO products (name,price) Values($1,$2) RETURNING * '
         const res=await conn.query(sql,[name,price])
         conn.release()
         return  res.rows[0]
    }
    catch (err)
    {
        throw new Error(`Could not add new book ${name}. Error: ${err}`)
    }


    }


    async update(id: string, price :number): Promise<product> {
        try {
      const sql = 'Update products SET price=($2) WHERE id=($1) Returning id,name,price '
      // @ts-ignore
      const conn = await Client.connect()
      
      const result = await conn.query(sql, [id,price])
      
      const product:product = result.rows[0]
      
      conn.release()
      
      return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
      }
   
    async delete(id: string): Promise<product> {
        try {
      const sql = 'DELETE FROM products WHERE id=($1) Returning id,name,price '
      // @ts-ignore
      const conn = await Client.connect()
      
      const result = await conn.query(sql, [id])
      
      const product:product = result.rows[0]
      
      conn.release()
      
      return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
      }
}