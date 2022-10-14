import express, { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders),
    app.get('/users-with-orders', usersWithOrders),
    app.get('/userOrders', userOrders)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
 try{
  const products = await dashboard.productsInOrders()
  res.json(products)}
  catch(err)
  {console.log(`${err}`)}
}

const usersWithOrders = async (_req: Request, res: Response) => {
  try{ 
  const users = await dashboard.usersWithOrders()
    res.json(users)
  }
  catch(err)
  {console.log(`${err}`)}
  }

  const userOrders = async (req: Request, res: Response) => {
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
    const users = await dashboard.userOrders(req.body.user_id)
    res.json(users)
  }  catch(err)
  {  res.status(400)
      res.json(err)
}
  }

  

  const getUserData =async (req: Request, res: Response) => {
   try{
    const users = await dashboard.getUserData(req.body.user_id)
    res.json(users) 
  }
  catch(err)
  {console.log(`${err}`)}
   
  }
export default dashboardRoutes


