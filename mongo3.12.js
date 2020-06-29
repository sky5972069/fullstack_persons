const mongoose = require('mongoose')
const len = process.argv.length
if ( len!==5 && len!==3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} 
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack-admin:${password}@fullstack-persons-naobs.mongodb.net/persons?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (len==3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
      result.forEach(p => {
        console.log(p.name+' '+p.number)
      })
      mongoose.connection.close()
  })
} else {
  const personName = process.argv[3]
  const personNum = process.argv[4]
  const personToAdd = new Person({
    name: personName,
    number: personNum
  })
  
  personToAdd.save().then(r => {
    console.log(`added ${personName} number ${personNum} to phonebook`)
    mongoose.connection.close()
  })
}


// const persons = [new Person(
//   {
//     name: "Arto Hellas",
//     number: "040-1234567",
//   }
// ),
// new Person(
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   }
// ),
// new Person(
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   }
// ),
// new Person(
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   }
// )]
// promises = []
// for (let i=0; i<persons.length; i++) {
//   console.log(persons)
//   let promise = persons[i].save()
//   promises.push(promise)
// }

// Promise.all(promises).then(r => {
//   console.log('all saved')
//   mongoose.connection.close()
// })






