import express,{Request, Response, Application} from "express"
import bodyParser from 'body-parser'
import dashboardRoutes from './handlers/dashboard'
import orderRoutes from './handlers/order'
import  ProductRoutes from './handlers/product'
import  userRoutes from './handlers/user'


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
userRoutes(app)
ProductRoutes(app)
orderRoutes(app)
dashboardRoutes(app)


export  default app;
