const express=require('express');
const JobApplication=require('../models/JobApplication');
const router=express.Router();
router.get('/',async(req,res)=>{try{const {status,search}=req.query;const f={};if(status&&status!=='All')f.status=status;if(search)f.$or=[{company:{$regex:search,$options:'i'}},{role:{$regex:search,$options:'i'}},{location:{$regex:search,$options:'i'}}];res.json(await JobApplication.find(f).sort({createdAt:-1}));}catch(e){res.status(500).json({message:'Failed to fetch applications'});}});
router.get('/stats',async(req,res)=>{try{const a=await JobApplication.find();const s={total:a.length,saved:0,applied:0,assessment:0,interview:0,offer:0,rejected:0};a.forEach(x=>s[x.status.toLowerCase()]++);const d=s.offer+s.rejected;s.successRate=d?Math.round(s.offer/d*100):0;res.json(s);}catch(e){res.status(500).json({message:'Failed to fetch statistics'});}});
router.post('/',async(req,res)=>{try{res.status(201).json(await JobApplication.create(req.body));}catch(e){res.status(400).json({message:'Invalid application data'});}});
router.put('/:id',async(req,res)=>{try{const a=await JobApplication.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!a)return res.status(404).json({message:'Application not found'});res.json(a);}catch(e){res.status(400).json({message:'Failed to update application'});}});
router.delete('/:id',async(req,res)=>{try{const a=await JobApplication.findByIdAndDelete(req.params.id);if(!a)return res.status(404).json({message:'Application not found'});res.json({message:'Application deleted'});}catch(e){res.status(400).json({message:'Failed to delete application'});}});
module.exports=router;
