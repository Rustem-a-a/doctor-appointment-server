import express from 'express'
import config from 'config'
import mongoose from "mongoose";
import cors from 'cors'
import slotRouter from './routes/slotRouter.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use('/slot',slotRouter)

const PORT =process.env.PORT || config.get('serverPort')


const start = async()=>{

    try{
        await mongoose.connect(config.get('database'),{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT,()=> {
            console.log('Server is running in port ' + config.get('serverPort'))
        })
    }
    catch (e){
        console.log(e)
    }
}
start()