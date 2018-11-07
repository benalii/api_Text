const express = require('express')
const app = express()

const port = 3000

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
