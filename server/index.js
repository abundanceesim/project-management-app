const express = require('express')
const colors = require('colors')
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000
const { graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const app = express()

// connect to db
connectDB();

// prevent CORS error
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`))
