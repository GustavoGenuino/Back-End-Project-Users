const { request, response } = require("express")
const express = require("express")
const uuid = require("uuid")
const cors = require("cors")

const port = 3001
const app = express()

app.use(express.json())
app.use(cors())

const users = []

const myFirstMiddleware = (request, response, next) => {

}
app.get('/users', (request, response) => {
  

    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)

    return response.status(201).json(users)
})



app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { name, age } = request.body

    const UptdateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    users[index] = UptdateUser
    return response.json(UptdateUser)
})


app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    users.splice(index, 1)




    return response.status(204).json(users)
})






app.listen(port, () => {
    console.log(`server started on ${port}`)

})
