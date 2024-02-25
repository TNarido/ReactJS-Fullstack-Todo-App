const mongoose = require('mongoose')

//Todos Schema

const TodoSchema = new mongoose.Schema({
    name : {
        type : String
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

module.exports = mongoose.model('todos', TodoSchema)