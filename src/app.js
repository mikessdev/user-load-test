const express = require('express')
const app = express()
const port = 3006

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
  res.send('users!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})