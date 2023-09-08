const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 3033

app.use(cors())
app.use(express.json())

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const users = JSON.parse(data)
            const user = users.find(user => user._id == id)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({errors: "Record not found"})
            }
        }
    })
})

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const users = JSON.parse(data)
            const user = users.find(user => user._id == id)
            if (user) {
                Object.assign(user, body)
                fs.writeFile('./data.json', JSON.stringify(users), () => {
                    res.json(user)
                })
            } else {
                res.status(404).json({ errors: "Record not found" })
            }
        }
    })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            let users = JSON.parse(data)
            const user = users.find(user => user._id == id)
            users = users.filter(user => user._id != id)
            if(user) {
                fs.writeFile('./data.json', JSON.stringify(users), () => {
                    res.json({
                        notice: `successfully deleted ${user.name}`
                    })
                })
            } else {
                res.status(404).json({ errors: "Record not found" })
            }
        }
    })
})


app.listen(port, () => {
    console.log('listening on port', port)
})