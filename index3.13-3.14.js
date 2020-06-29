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
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              ${Date()}`)
  })
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })
  
app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then(person=>{
      response.json(person)
    })
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p=>p.id!==id)
    res.status(204).end()
  })


app.post('/api/persons', (req, res) => {
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
      }
      
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

