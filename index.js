const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
morgan.format('joke', ':method :url :status :type');
app.use(morgan('joke'))
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-1234567",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              ${Date()}`)
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(n=>n.id===id)
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


const generateId = () => {
    const Id = Math.ceil(Math.random()*100000)

    return Id
  }


app.post('/api/persons', (req, res) => {
      const newPerson = req.body
      if (!newPerson.name) {
        return res.status(400).json({error:'name missing'})
      } else if (!newPerson.number) {
        return res.status(400).json({error:'number missing'})
      } else if ([...persons.map(p=>p.name)].find(p=>p.name===newPerson.name)){
        return res.status(400).json({error:'name already exists'})
      } else {
        const newP = {
          name: newPerson.name,
          number : newPerson.number,
          id: generateId()
        }
        persons = persons.concat(newP)
        res.json(newP)
      }

  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

