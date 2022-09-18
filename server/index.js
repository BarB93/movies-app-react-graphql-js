const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const schema = require('./src/schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
const PORT = 5000

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.tgunbvp.mongodb.net/movies?retryWrites=true&w=majority`)

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, () => console.log(`Server was running on port ${PORT}`))
