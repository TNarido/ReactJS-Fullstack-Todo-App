const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config()
const TodoModel = require('./models/Todos')
const UserModel = require('./models/Users')


//Initialize the server
const app = express()


//Load Middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
colors.enable()

const PORT = process.env.PORT || 5001


//Connect to MONGODB
mongoose.connect(process.env.MONGO_DB)
.then(() => console.log("Connect to MONGODB".yellow.underline))
.catch(err => console.log(err))

//Todo Route
app.get('/todos', async (req, res) => {
    //Get all todos from todos collection
    const results = await TodoModel.find()
    res.send(results)
})


//Create a new Todo
//Post
app.post('/todos', async (req, res) => {
    const {name} = req.body
    try {
        const results = await TodoModel.create({name : name})
        res.send(results)
    } catch (error) {
        console.log(error)
    }
})


//Delete a TODO
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params
    
    try {
        const result = await TodoModel.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})


//Update a Todo Name
app.put('/todos/:id', async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    
    try {
        const result = await TodoModel.findByIdAndUpdate(id, {
            name : name
        })
        res.send(result)
    } catch (error) {
        console.log(error)
    }
})


//User Routes
//HTTP Codes
app.post('/users/register', async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Fill up all the fields you fucker!')
    }

    //Check if user exists
    const userExist = await UserModel.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists dumb!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Register users
    const user = await UserModel.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json(user)
    }else{
        res.status(400).json({
            "error" : "User data's fuckin' invalid!"
        })
    }
})


//User login
app.post('/users/login', async(req, res) =>{
    const {email, password} = req.body

    //Check if email exists in the DB
    const user = await UserModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400).json({
            error : "Credential's fuckin' invalid!"
        })
    }
})


//Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}


//Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.gray.underline)
})