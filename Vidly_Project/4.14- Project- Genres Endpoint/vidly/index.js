const mongoose =require('mongoose') 
const Joi = require("joi");
const express = require('express');
const app = express();

app.use(express.json());

async function connectToMongo() {
  return await mongoose.connect('mongodb://localhost/vidly', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
  })
}

const myMongoDBConnection = connectToMongo()

myMongoDBConnection
  .then(() => console.log('Connection to MongoDB was sucessfully!'))
  .catch(error => console.log(`Connection error: ${error}`) )


const genreSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Genre = mongoose.model('Genre', genreSchema)

app.get('/vidly', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
});

app.post('/vidly', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name })
  const result = await genre.save();

  res.send(result);
});

app.put('/vidly/:id', async (req, res) => {
  
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  })

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

app.delete('/vidly/:id', async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id) 
  
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

app.get('/vidly/:id', async (req, res) => {

  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));