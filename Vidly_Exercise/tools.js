// Estou tentando abstrair as funções do código do index.js usando as funões abaixo.

const Joi = require("joi")

module.exports = {

    validator: Joi,

    post: function  (array,req) {

        const newPost = {
            id: parseInt(req.params.id),
            genre: req.body.genre
        }
        
        array.push(newPost)
        return array

        },

    put: function (element, array, req) {

            const index = array.indexOf(element)
            array.splice(index,1, { id: parseInt(req.params.id), genre: req.body.genre })
            return array[index]

        },

    validation: function (req, validationObj) {
        return this.validator.validate(req.body, validationObj)
    },

    remove: function (element, array) {

        const index = array.indexOf(element)
        array.splice(index,1)
        return "The removing was sucessfully :)"

        }

}