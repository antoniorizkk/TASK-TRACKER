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

    try{
        const {id} =req.params;
        const numericId = Number(id);

        const deletedTask = await Task.findOneAndDelete(
            {taskId: numericId}
        );

        if(!deletedTask){
            return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json({message:"Task deleted successfuly"});

    } catch (err) {
        res.status(500).json({error:err.message});
    }

}

const listTask = async (req,res) => {
    try{
        const {status} = req.params;
        const stringStatus = String(status);

        const validStatuses = ["todo","in-progress","done"];

        if(!validStatuses.includes(stringStatus)){
            return res.status(400).json({error:"not valid status (use todo, in-progress, or done)"})
        }

        const tasks = await Task.find({
            status:stringStatus,
        });

        if(tasks.length === 0){
            return res.status(404).json({message:"No todo task(s)"});
        }
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}


const updateTaskStatus = async (req, res) => {
    try{
        const {status,id} = req.params;
   

        const numericId = Number(id);
        const stringStatus = String(status)

        const validStatuses = ["todo","in-progress","done"];

        if(!validStatuses.includes(stringStatus)){
            return res.status(400).json({error:"not valid status (use todo, in-progress, or done)"})
        }

        const updateTask = await Task.findOneAndUpdate(
            {taskId:numericId},
            {$set:{status:stringStatus}},
            {new: true}
        );

        if(!updateTask){
            return res.status(400).json({error:"Task not found"});
        }

        res.status(200).json(updateTask);

    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

export default {insertTask, updateTask, deleteTask, listTask,updateTaskStatus}