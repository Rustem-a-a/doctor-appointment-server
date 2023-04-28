import {Router} from "express";
import Doctor from "../models/doctor-model.js";
import Slot from "../models/slot-model.js";
import {ObjectId} from "mongodb";
const router = new Router()

router.post('/slotAdd',
    async (req, res) => {
        try {

            const {user_id,doctor_id,slots} = req.body
            console.log(35345346436346)
            const doctor = await Doctor.findOne({_id:doctor_id})
            if (!doctor) {
                return res.status(400).json({message: 'Doctor with this id is not existed'})
            }
            console.log(11)
            const slotToAdd = new Slot({
                user_id,
                doctor_id,
                slots
            })
            await slotToAdd.save()
            return res.status(200).json({slotToAdd})

        } catch (e) {
            return res.status(405).json({message: 'SLOT IS NOT CREATED!!!'})
        }
    }
)


router.post('/doctorAdd',
    async (req, res) => {
        try {
            console.log(234444444444)
            const {name,spec,slots} = req.body
            const doctorToAdd = new Doctor({
                name,
                spec,
                slots
            })
            await doctorToAdd.save()
            return res.status(200).json({doctorToAdd})

        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)



export default router