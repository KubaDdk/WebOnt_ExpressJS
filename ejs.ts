import express from 'express'
import ejs from 'ejs'
import { data } from './data'

const app = express()

app.set('view engine', 'ejs')
app.set('port', 3000)



app.get('/', (req, res) =>{
    res.render('index', {
        person: {
            name: 'steven',
            age: 20
        }
    })
})

app.get('/group', (req, res) => {
    res.render('group', {data})
})

app.listen(app.get('port'), () =>{
    console.log('[server] http://localhost' + app.get('port'))
})