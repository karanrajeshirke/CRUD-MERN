import express from 'express'
import mongoose from 'mongoose';
import userModel from './userModel.js';
import cors from "cors"
import morgan from 'morgan';
const app=express()


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
const connectDB=async()=>
{

try {
    let conn=await mongoose.connect('mongodb://127.0.0.1:27017/PRACT-REACT-CRUD')
    console.log(`connected ${conn.connection.host}`)
  } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
  }

}

connectDB()


app.post('/add',async(req,res)=>
{
    try
    {
        let {name,email,role}=req.body

        console.log(req.body)
        const user=await new userModel(
            {
                name,email,role
            }
        ).save()

        return res.status(200).send(
            {
                message:"Data added",
                user
            }
        )
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).send(
            {
                message:error.message
            }
        )
    }
})

app.get('/getall',async(req,res)=>
{
    try
    {
        let users=await userModel.find()
        res.status(200).send(
            {
                message:"All data",
                users
            }
        )
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).send(
            {
                message:error.message
            }
        )
    }
})

app.put('/update/:id',async(req,res)=>
{
    try
    {
        let {id}=req.params
        let {name,email,role}=req.body
        let user=await userModel.findByIdAndUpdate(id,{name,email,role},{new:true})

        res.status(200).send(
            {
                message:"User updated",
                user
            }
        )
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).send(
            {
                message:error.message
            }
        )
    }
})


app.delete('/delete/:id',async(req,res)=>
{
    try
    {
        let {id}=req.params
        let user=await userModel.findByIdAndDelete(id)

        res.status(200).send(
            {
                message:"User Deleted",
                user
            }
        )
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).send(
            {
                message:error.message
            }
        )
    }
})


app.listen(8000,()=>
{
    console.log("Server started on port 8080")
})