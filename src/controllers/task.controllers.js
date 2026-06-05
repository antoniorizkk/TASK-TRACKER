import mongoose from "mongoose";
import Task from "../models/task.model.js";

const insertTask = async (req, res) => {
    try{
        const {title,description} = req.body;
        const createTask = await Task.create(req.body);
        
        res.status(201).json(createTask);

    } catch (err){
        res.status(500).json({error:err.message});
    }
}

const updateTask = async (req,res) => {
    try{
        const {id} = req.params;
        const {title,description} = req.body;
        const numericId = Number(id);

        const updatedTask = await Task.findOneAndUpdate(
            {taskId: numericId},
            {$set:{title,description}},
            {new:true}
        );

        if(!updateTask){
            return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

const deleteTask = async (req,res) => {
    const {id} =req.params;
    const numericId = Number(id);

    const deletedTask = await Task.findOneAndDelete(
        {taskId: numericId}
    );

    if(!deletedTask){
        return res.status(404).json({message:"Task not found"});
    }

    res.status(200).json({message:"Task deleted successfuly"});
}

const listTodoTask = async (req,res) => {
    const tasks = await Task.find({status: "todo"});

    if(!tasks){
        return res.status(404).json({message:"No todo tasks available"});
    }

    res.status(200).json(tasks);
}



export default {insertTask, updateTask, deleteTask, listTodoTask}