const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.post('/', function (req, res) {
  const body = req.body

  res.send(`POST request to the homepage ${JSON.stringify(body,null,2)}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
