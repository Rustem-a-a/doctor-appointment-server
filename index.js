import express from 'express'
import config from 'config'
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import doctorRouter from './routes/doctorRouter.js'
import slotRouter from './routes/slotRouter.js'
import schedule from 'node-schedule'
import taskToSchedule from "./task.js";
import fs from "fs";

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/doctor', doctorRouter)
app.use('/slot', slotRouter)

const PORT = config.get('serverPort')||1002
const start = async () => {
    try {
        await mongoose.connect(config.get('database'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server is running in port ' + config.get('serverPort'))
        })
    } catch (e) {
        console.log(e)
    }
}
start()
const job = schedule.scheduleJob('*/1 * * * *', taskToSchedule);
fs.writeFileSync('notification.log','')