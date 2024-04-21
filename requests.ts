import express from 'express'
import { data } from './data'
import { Person } from './types'

const app = express()

app.set('port', 3000)
app.use(express.static('public'))
app.set('view engine', 'ejs')


//Headers:
app.get('/headers', (req, res) => {
    let userAgent = req.headers['user-agent']
    res.type('text/html')
    res.send(`Your browsed is ${userAgent}`)
})

//Query:
let people = ['Sven', 'Andie', 'Gerogie', 'Ann']

app.get('/person', (req, res) => {
    res.type('text/html')
    if (typeof req.query.index === "string") {
        let index = parseInt(req.query.index)
        res.send(people[index])
    } else {
        res.send('Ongeldige parameterwaarde')
    }
})

//Search with form:
app.get("/search", (req, res) => {
    let q: string = ''
    if (typeof req.query.q === 'string'){
         q = req.query.q ?? "";
    }
    let filteredPersons: Person[] = data.filter((person) => {
        return person.name.toLowerCase().startsWith(q.toLowerCase());
    });
    res.render("search", {
        persons: filteredPersons,
        q: q
    });
});


app.get('/', (req, res) => {
    res.type('text/html')
    res.send('Amazin app')
})


app.listen(app.get("port"), async () => {
    console.log("[server] http://localhost:" + app.get("port"))
})