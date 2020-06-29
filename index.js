require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
morgan.format('joke', ':method :url :status :type');
app.use(morgan('joke'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    ${Date()}`)
  })
  })
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })
  
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person=>{
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(deleted => {
      res.status(204).end()
    })
    .catch(error => next(error))
  })


app.post('/api/persons', (req, res, next) => {
      const newPerson = req.body
      if (!newPerson.name) {
        return res.status(400).json({error:'name missing'})
      } else if (!newPerson.number) {
        return res.status(400).json({error:'number missing'})
      } else {
        const person = new Person({
          name:newPerson.name,
          number:newPerson.number
        })
        person.save().then(savedPerson => {
          res.json(savedPerson)
          console.log(`${newPerson.name} added`)
        })
        .catch(error => next(error))
      }
      
      
  })


app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
  .then(updatedNote => {
    res.json(updatedNote)
  })
  .catch(error => next(error))

})



  const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)



  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    console.log('in error')
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
      return res.status(400).send(error.message)
    }
  
    next(error)
  }
  
  app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

