// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config()

 let pepper='new1'
 let SaltRounds:string ='10'
export type user={
    id :number,
    firstname :string,
    lastname :string,
   

}
export class userStore{
  async index():Promise<user[]|null>
  { try{

    const conn = await Client.connect()
    const sql='SELECT id,firstname,lastname FROM users '
    const res=await conn.query(sql)
    conn.release()
 
    return res.rows
  }
  catch(err)
  {
    throw new Error(`unable to show all users`)
    return null
  }
  }

  async show(id:string):Promise<user|null>
  { try{
    const conn =await Client.connect()
    const sql  ='SELECT id,firstname,lastname FROM users Where id=($1)  '
    const res  =await conn.query(sql,[id]) 
    conn.release()
   
    return res.rows[0]
  }
  catch(err)
  {
    throw new Error(`unable to show user whose id ${id} `) 
    return null
  }
  }
// create 
async create(firstname:string,lastname:string,password:string):Promise <user>
{
  try{ const  conn= await Client.connect();
  const  sql ='INSERT INTO users (firstname,lastname,password)Values($1,$2,$3) RETURNING id,firstname,lastname'

  const hash= bcrypt.hashSync( password+pepper, parseInt(SaltRounds));
  const res= await conn.query(sql,[firstname,lastname,hash]);


      conn.release()
   
      return res.rows[0];
 }
 catch (err)
 {throw new Error(`unable create user (${firstname}): ${err}`)}

}



async authenticate(firstname:string,lastname:string ,password:string) :Promise<user |null>
{  try{ 
    const conn= await Client.connect()
    const sql='SELECT password FROM users WHERE firstname =($1) AND lastname =($2) '
    const res= await conn.query(sql,[firstname,lastname])

    if(res.rows.length)
    {  const user=res.rows[0];
      if(bcrypt.compareSync(password+pepper,user.password))
      {return user}
    }

    return  null
  }
  catch(err)
  {console.log(`err`)
 return null}
}
async delete(id: string): Promise<user> {
  try {
const sql = 'DELETE FROM users WHERE id=($1) Returning id,firstname,lastname'
// @ts-ignore
const conn = await Client.connect()

const result = await conn.query(sql, [id])

const user:user = result.rows[0]

conn.release()

return user
  } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`)
  }
}


}