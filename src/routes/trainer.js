import { Router } from "express";
import trainerModule from '../module/trainer.js';
const user = Router()


user.get('/', async (req,res)=>{
    const result = await trainerModule.findAll()
    res.json(result)
});

user.get('/:id', async (req,res)=>{
    const result = await trainerModule.findById(req.params.id)
    res.json(result)
});

user.post('/', async (req,res)=>{
    const result = await trainerModule.create(req.body)
    res.json(result)
});

user.put('/:id', async (req,res)=>{
    const result = await trainerModule.findByIdAndUpdate(req.params.id, req.body)
    res.json(result)
});

user.delete('/:id', async (req,res)=>{
    const result = await trainerModule.findByIdAndDelete(req.params.id)
    res.json(result)
});

export default user;
