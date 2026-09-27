const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  company:{type:String,required:true,trim:true}, role:{type:String,required:true,trim:true},
  location:{type:String,default:''}, jobUrl:{type:String,default:''}, salary:{type:String,default:''},
  status:{type:String,enum:['Saved','Applied','Assessment','Interview','Offer','Rejected'],default:'Saved'},
  appliedDate:{type:Date,default:null}, interviewDate:{type:Date,default:null}, notes:{type:String,default:''}
},{timestamps:true});
module.exports=mongoose.model('JobApplication',schema);
