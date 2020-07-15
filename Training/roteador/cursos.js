const express = require("express")
const roteador = express.Router()
const Joi = require("joi")

const cursos = [
    {id: 1, curso: "HTML"},
    {id: 2, curso: "CSS"},
    {id: 3, curso: "JS"}
]

function validar(requisicao) {

    const esquema = {
        name: Joi.string().min(2).required()
    }

    const validacao = Joi.validate(requisicao.body, esquema)
    return validacao
}

function inserir (requisicao, resposta) {
    const novoPost = {
        id: parseInt(requisicao.params.id),
        curso: requisicao.body.name
        }
    cursos.push(novoPost)
    resposta.send(cursos)
}

roteador.get("/", (requisicao, resposta) => {
    resposta.send("Olá, você fez uma requisão de um servidor de cursos!")
})

roteador.get("/:id", (requisicao,resposta) => {
    const resultado = cursos.find(curso => curso.id === parseInt(requisicao.params.id))

    if(!resultado) {
        resposta.status(404).send("O curso não foi encontrado")
        return
    } 
    resposta.send(resultado)
})


roteador.post("/:id", (requisicao, resposta) => {
    
    const resultado = cursos.find(curso => curso.id === parseInt(requisicao.params.id))

    const { error } = validar(requisicao)

   
    if(resultado) {
        resposta.status(400).send(`O curso já existe com esse Id já existe !`)
        return
    }
    else if (error) {
        resposta.status(400).send(error.details[0].message)
        return
    }
    
    inserir(requisicao,resposta)

})

roteador.put("/:id", (requisicao, resposta) => {
    const resultado = cursos.find(curso => curso.id === parseInt(requisicao.params.id))
    
    
    if(!resultado) {
        resposta.status(400).send("O curso não existe!")
        return
    }
    const index = cursos.indexOf(resultado)
    cursos.splice(index, 1, { id: resultado.id, name: requisicao.body.name })
    resposta.send(cursos)

})

roteador.delete("/:id", (requisicao,resposta) => {

    const resultado = cursos.find(curso => curso.id === parseInt(requisicao.params.id))

    if(!resultado) {
        resposta.status(400).send("O curso não existe!")
        return
    }

    const index = cursos.indexOf(resultado)
    cursos.splice(index,1)
    resposta.status(200).send(resultado)

    
})

module.exports = roteador