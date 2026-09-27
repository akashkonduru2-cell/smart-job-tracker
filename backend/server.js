require('dotenv').config();
const express=require('express'),cors=require('cors'),mongoose=require('mongoose');
const routes=require('./routes/applications');
const app=express(),PORT=process.env.PORT||5000;
app.use(cors());app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'smart-job-tracker-api'}));
app.use('/api/applications',routes);
mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log('MongoDB connected');app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`));}).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1);});
