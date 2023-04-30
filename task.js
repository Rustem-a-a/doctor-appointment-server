import Slot from "./models/slot-model.js";
import fs from 'fs'

const taskToSchedule = async () => {
    const date = new Date()
    const slots = await Slot.find({notified: false, "slot": {$gte: date}}).populate("doctor_id").populate("user_id")
    slots.forEach(async (v) => {
        const interval = (v.slot - date) / 1000 / 60;
        if (interval <= 120) {
            const message = `${date.toISOString()} | Привет ${v.user_id.name}! Вам через 2 часа к ${v.doctor_id.spec}у в ${v.slot.toLocaleTimeString('default', {
                hour: 'numeric',
                minute: 'numeric',
            })}`
            fs.appendFile('notification.log', `${message}\n`, (err) => {
                if (err) {
                    console.error(err);
                }
            })
            await Slot.findByIdAndUpdate(v._id, {
                    notified: true,
                },
                {
                    new: true
                })
        }
    })
}
export default taskToSchedule