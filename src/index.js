const express = require('express')

const bodyParser = require('body-parser')

const justify = require('justified');
const { isString, get } = require('lodash/fp')

const app = express()
const port = 3000

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.post('/', function (req, res) {
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
