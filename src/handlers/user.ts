import Express,{Request,Response}  from "express";
import { user, userStore} from '../models/user'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const userstore =new userStore()

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
    const users=await userstore.index()
    res.json(users)
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
    const user =await userstore.show(req.params.id)
    res.json(user)

}

const create= async (req:Request,res:Response)=>
{ try
    {
  const  firstName:string=req.body.firstName
  const  lastName:string= req.body.lastName
  const password:string=req.body.password

    const user= await userstore.create( firstName,lastName,password)
    var token = jwt.sign({ firstName,lastName,password}, process.env.TOKEN_SECRET||"");
    res.json(token)
 


}
catch(err)
{  res.status(400)
    res.json(err)}
}

const userRoutes=(app:Express.Application)=>{

    app.get('/users',index)
    app.get('/users/:id',show)
    app.post('/users',create)

}
export default userRoutes