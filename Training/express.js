const express = require("express")
const app = express()
const cursos = require('./roteador/cursos')


app.use(express.json())
app.use(express.static("publica"))
app.use("/api/cursos", cursos)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

// Devolve 'development' por padrão, caso o precesso seja 'undefined''
console.log(app.get('env'))

// Feita pra explicar como funciona os middlewares
// app.use( function (req, resp, next) {
//     console.log('Logando...')
//     next()
// })

const port = 3030

app.listen(port, () => console.log(`Aplicaçao rodadando na porta ${port}...`))