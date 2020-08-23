const express = require("express"),
  mongoose = require('mongoose');

const morgan = require("morgan");
const Item = require("../model/item");
const bodyParser = require("body-parser");
const cors = require('cors');

const mongoCred = require('../config').mongoAtlas;
const port = process.env.port || 5000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// connect to database
// Add our credentials here
const uri = `mongodb+srv://${mongoCred.username}:${mongoCred.password}@cluster0.ju4il.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => { console.log('MongoDB Error:' + err); process.exit(1) });


app.get("/item", async function (req, res) {
  let items = await Item.find();
  return res.status(200).json(items);
})

app.post('/item', function (req, res) {
  if (req.body.content === undefined || req.body.content.length === 0)
    return res.status(400).json({ message: "invalid data" });

  Item.create({ content: req.body.content })
  .then((document)=>{
    res.status(200).json(document);
  });
});

app.delete("/item/:id", function(req, res){
  const id = req.params.id;

  Item.deleteOne({_id: id})
  .then((val)=>{
    res.status(200).send(` ${val.deletedCount} item deleted`);
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send(err);
  });

})

app.listen(port, function(){
  console.log(`Server running on port: ${port}`);
});


