import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    isFinished:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: new Date(),
}
);

const Task = new mongoose.model("Task",taskSchema);

export default Task;