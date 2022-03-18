// from https://expressjs.com/en/starter/hello-world.html

const express = require('express');
const app = express();
const port = 8000; //server port
const cors = require('cors');
const path = require('path');
const items = require('./itemStorage');

app.use(express.static(path.join(__dirname, '../client')));//Allows to load the files that are in the public directory

app.use(cors({
  origin: 'http://localhost:8001',
  methods: ['GET','POST','DELETE', 'OPTIONS']
}))//defined origin and methods

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//Route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'))//Should initiate index.html file
})

app.get('/itemStorage/', (req, res) => {
  res.status(200).json(items);
})

app.post("/items", (req, res) => {
  var nextId = parseInt(Object.keys(items).reduce((a, b) => items[a] > items[b] ? a : b)) + 1;//Finds a unused number to identify item 
  const newItem = {//
    id: nextId,//int
    user_id: req.body.user_id,//string
    keywords: req.body.keywords,//array
    description: req.body.description,//string
    image: req.body.image,//string
    lat: req.body.latitude,//int
    lon: req.body.longitude,//int
    date_from: new Date,//date
    date_to: new Date//date
  }
  if (!newItem.user_id || !newItem.keywords || !newItem.description || !newItem.lat || !newItem.lon) {//reject if a field is empty
    return res.status(405).json({ msg: 'Invalid input' });
  }
  items[newItem.id] = newItem;
  res.status(201).json({msg:'Item created.',items});
})

app.get("/itemStorage/:itemId", (req, res) => {
    if (Object.keys(items).length == 0) {//Check if not empty
      return res.status(204).json({ msg: `No items found.` });
    }
    else
    {
      var searchId = req.params.itemId;
      var itemIds = Object.keys(items);
      if (itemIds.includes(searchId)) {//Check if item exist
        var item = items[searchId];
        res.status(200).json({ item, msg: 'Item Found' });//Return item
      }
      else
      {
        res.status(404).json({ msg: 'Invalid input' })
      }
    }
  })

app.delete("/itemStorage/:itemId", (req, res) =>{
  const searchID = req.params.itemId;
  const itemIds = Object.keys(items);
  if (itemIds.includes(searchID)) {////Check if item exist
    delete items[searchID];//Deletes the item from itemStorage
    return res.status(200).json({ items });
  }
  else
  {
    return res.status(404).json({ msg: `No items found.` });
  }  
})

app.listen(port, () => {
  console.log(`App listening at port: ${port}`)
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
})