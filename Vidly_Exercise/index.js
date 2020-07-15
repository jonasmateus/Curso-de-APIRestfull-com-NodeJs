const db = require("debug")("db")
const config = require("config")
const express = require("express")
// const tools = require("./tools") não é necessário importar o Joi se vai me usar
const Joi = require("joi")

const app = express()

let movies = [
{
    id: 1,
    genre: "Drama"
},
{
    id: 2,
    genre: "Romance"
},
{
    id: 3,
    genre: "Horor"
}
]

// const schemaObj = {
//     genre: tools.Joi.string().min(4).required()
// }

// Funcões utilitárias
function post (req) {
const newPost = {
    id: parseInt(req.params.id),
    genre: req.body.genre
}
movies.push(newPost)
return movies
}

function validation (req) {
const squema = {
    genre: Joi.string().min(4).required()
}

return Joi.validate(req.body, squema)
}

function put (element, req) {
const index = movies.indexOf(element)
movies.splice(index,1, { id: parseInt(req.params.id), genre: req.body.genre })
return movies[index]
}

function remove (element) {
const index = movies.indexOf(element)
movies.splice(index,1)
return "The removing was sucessfully :)"
}
// // // //

app.use(express.json())

app.get("/vidly/genres", (req, resp) => {
resp.status(200).send(movies)
})

app.get("/vidly/genres/:id", (req, resp) => {
const result = movies.find( m => m.id === parseInt(req.params.id))

if (!result) {
    resp.status(404).send("The genre with given Id wasn't found :(")
    return
}
const index = movies.indexOf(result)
resp.status(200).send(movies[index])
})

app.post("/vidly/genres/:id", (req, resp) => {
const result = movies.find( m => m.id === parseInt(req.params.id))

const { error } = validation(req)

if (result) {
    resp.status(404).send("The genre already exists!")
    return
}
else if (error) {
    resp.status(404).send(error.details[0].message)
    return
}
// resp.status(200).send(tools.post(movies,req))

resp.status(200).send(post(req))
})

app.put("/vidly/genres/:id", (req, resp) => {
const result = movies.find( m => m.id === parseInt(req.params.id))

// const { error } = tools.validation(req, schemaObj)
const { error } = validation(req)



if(!result) {
    resp.status(404).send("The genre with given Id wasn't found :(")
    return
}
else if ( error ) {
    resp.status(404).send(error.details[0].message)
    return
}
// resp.status(200).send(tools.put(result, movies, req))

resp.status(200).send(put(result, req))

})

app.delete("/vidly/genres/:id", (req, resp) => {
const result = movies.find( m => m.id === parseInt(req.params.id))

if(!result) {
    resp.status(404).send("The genre with given Id wasn't found :(")
    return
}
// resp.status(200).send(tolls.remove(result, movies))

resp.status(200).send(remove(result))

})
const port = 2020

console.log(`Name: ${config.get("name")}`)
console.log(`Server: ${config.get("mail.host")}`)
console.log(app.get("env"))

function debug () {
    setInterval(() => db("Debugger_A:"), 1000)
}
debug()

app.listen(port, () => console.log(`Your app is running on port: ${port}`))
