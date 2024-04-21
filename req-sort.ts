import express from 'express'
import ejs from 'ejs'
import { data } from './data'
import { cities} from './data'

const app = express()

app.set('view engine', 'ejs')
app.set('port', 3000)

interface Person {
    name: string;
    age: number;
}

const persons: Person[] = [
    { name: "Sven", age: 25 },
    { name: "Andie", age: 24 },
    { name: "George", age: 30 },
    { name: "Zeoff", age: 28 },
]

app.get('/', (req, res) => {
    const sortField = typeof req.query.sortField === 'string' ? req.query.sortField : 'name'
    const sortDirection = typeof req.query.sortDirection === 'string' ? req.query.sortDirection : 'asc'
    let sortedPersons = [...persons].sort((a, b) => {
        if (sortField === "name") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "age") {
            return sortDirection === "asc" ? a.age - b.age : b.age - a.age;
        } else {
            return 0;
        }
    });
})


app.listen(app.get('port'), () =>{
    console.log('[server] http://localhost' + app.get('port'))
})