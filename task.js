import Slot from "./models/slot-model.js";
import fs from 'fs'

const taskToSchedule = async () => {
    const slots = await Slot.find({}).populate("doctor_id").populate("user_id")
    const date = new Date()
    const currentTime = date.getHours() * 60 + date.getMinutes()
    const result = slots.reduce((ac, v) => {
        const timeToArr = v.slot.split('.')
        const slotMinutes = timeToArr[0] * 60 + timeToArr[1] * 1
        if (currentTime - slotMinutes === 19) {
            return ac + '' + v.user_id.name + ',Вам до приема осталось 2 часа.  '
        }
    }, '')
    console.log(result)
    fs.writeFileSync('notification.log', JSON.stringify(result))
}
export default taskToSchedule