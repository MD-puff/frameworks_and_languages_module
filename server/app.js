// from https://expressjs.com/en/starter/hello-world.html

const express = require('express')
const app = express()
const port = 8000 //server port

app.get('/', (req, res) => {
  //res.send('Hello World!')

  // https://expressjs.com/en/4x/api.html#res.json
  res.json({ hello: 'world' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// https://expressjs.com/en/guide/error-handling.html
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Docker container exit handler
// https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {
    process.exit();
});