// const cors = require('cors')
const express = require('express')
const path = require('path')
const db = require('./db/db.json')
const uuid = require('./helpers/uuid.js')
const fs = require('fs')
const e = require('express')
const PORT = 5000;

const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors)

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    setTimeout(() => {
        res.json(db)
    }, 100)
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    const data = {
        title,
        text,
        id: uuid()
    }

    const arr = [...db, data]
    fs.writeFile('./db/db.json', JSON.stringify(arr), (error) => {
        res.sendStatus(200)
    })
    
    
})
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const result = db.filter((el) => {
        return id !== el.id
    })
    fs.writeFile('./db/db.json', JSON.stringify(result), (error) => {
        res.json(JSON.stringify(result))
    })

})

app.listen(PORT, () => {
    console.log('App has been started!')
})

