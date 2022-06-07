require('dotenv').config()
require('express-async-errors')

const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressRateLimmitter = require('express-rate-limit')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const authRouter = require("./routes/auth");
const adminRouter = require('./routes/admin')
const productsRouter = require('./routes/products')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const notFoundMiddleware = require('./middleware/notfound')
const authMiddleware = require('./middleware/authentication')
const swaggerDocument = YAML.load('./swagger.yaml')

/************ MIDDLEVARES *************/

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(expressRateLimmitter({windowMs : 60 * 1000, max : 60}))

app.get('/', (req, res) => {
  res.send(`<h1>To-Do App</h1><a href='/api-docs'>Documentation</a>`)
})
/************ ROUTES *************/
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authMiddleware, productsRouter);

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  }
  catch (error) {
    console.log(error)
  }
}

start()
