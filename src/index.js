const express = require('express')
const gql = require("graphql-tag")
const bodyParser = require('body-parser')

const justify = require('justified');
const { isString, get, isNil } = require('lodash/fp')

const client = require("./connectors/apollo")
const authentication = require("./middleware/authentication")
const app = express()
const port = 3000

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.post("/graph",async function(req, res) {
  const result = await client.query({query: gql`query user {
  allUsers {
    id
    email
  }
}
`})
  res.send(result)
})

app.post('/',authentication, function (req, res) {
  const text = get( "body.text", req)
  if(!isString(text)){
    res.sent({Status:500, error:"input error"})
  }else{
   const output = justify(text,{ width:80 })
   res.send({
     Status:200,
     body : {
       text: output
     }
   })
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
