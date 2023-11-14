import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/dbconnection.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Users } from './models/userSchema.js';
import bcrypt from 'bcrypt';
import { Questions } from './models/questionSchema.js';


const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();
const port = process.env.PORT || 5000
// middlewares
app.use(bodyParser.json());
app.use(cors());

// User Registration 
app.post('/register', async (req, res) =>{
    try{
        const { email, username, password } = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = new Users({email, username, password: hashedpassword})
        await newUser.save()
        res.status(201).json({message:'User created Successfully'})
    }catch(error){
        res.status(500).json({err0r: 'There is error in Signup. Either enter other Email or use unique Username'})
    }
})


// Put questions in backend 

app.post('/quiz', async (req,res) =>{
    try{
        const { questions, options, answers, level } = req.body
        const newQuestion = new Questions({questions, options, answers, level})
        await newQuestion.save()
        res.status(201).json({message:'Question Successfully added to database'})
    }catch(error){
        res.status(500).json({err0r: 'TThere is error in adding the question'})
    }
})

// Get Registered User
app.get('/register', async (req, res)=>{
    try{
        const users = await Users.find()
        res.status(201).json(users)
    }catch(error){
        res.status(500).json({error: 'Unable to find Users'})
    }
})

// get question from backend
app.get('/quiz', async (req,res) =>{
    try{
        const questions = await Questions.find()
        res.status(201).json(questions)
    }catch(error){
        res.status(500).json({error: 'Unable to get questions'})
    }
})

// get Login of User
app.post('/login', async (req, res)=>{
    try{
        const {username, password} = req.body
        const user = await Users.findOne({ username })
        if(!user){
            return res.status(401).json({error: 'Invalid Credentials'})
        }
        const passwrodValid = await bcrypt.compare(password, user.password)
        if(!passwrodValid){
            return res.status(401).json({error: 'Invalid Credentials'})
        }
        res.json({message: "Login Successful"})
    }catch(error){
        res.status(500).json({error: 'Erro in Login'})
    }
})

// api for questions
app.use('/api', router) // for api call through route use /api, router

app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
});

// app running port after database connection
connect().then(() => {
    try {
        app.listen(port, ()=>{
            console.log(`Server is running on port: ${port}`)
        });
    } catch (error) {
        console.log("Cannto connect to the server")
    }
}).catch(error => {
    console.log("Invalid database connection");
});




