import express from 'express';

const app = express();

interface Person {
    name: string,
    age: number
}


const data: Person[] = [
    {
        name: 'george',
        age: 40
    },
    {
        name: 'jane',
        age:28
    },
    {
        name: 'steven',
        age: 109
    },
    {
        name: 'josh',
        age: 34
    }

]


app.set("port", 3000)

app.get("/", (req, res) => {
    res.type("text/html")
    res.send("Main page of the app")
})
//json route:
app.get('/getData', (req, res) => {
    res.type('application/json')
    res.json(data)
})

//async route:
app.get('/users', async (req,res) =>{
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let data = await response.json()
    res.type('application/json')
    res.send(data)
})

app.get("/hello", (req, res) => {
    res.type('text/html')
    res.send('<h1>This is HELLO page </h1>')
})

//This is to check 404 pages: (it is important to have this route beneath all other routes)
app.use((req, res) => {
    res.type('text/html')
    res.status(404)
    res.send('404 - Not Found')
})


app.listen(app.get("port"), async ()=> {
    console.log("[server] http://localhost:" + app.get("port"))
})