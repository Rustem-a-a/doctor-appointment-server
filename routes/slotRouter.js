import {Router} from "express";
import Doctor from "../models/doctor-model.js";
import Slot from "../models/slot-model.js";

const router = new Router()

router.post('/slotAdd',
    async (req, res) => {
        try {
            const {user_id, doctor_id, slot} = req.body
            const doctor = await Doctor.findOne({_id: doctor_id})
            if (!doctor) {
                return res.status(400).json({message: 'Can not add, Doctor with this id is not existed'})
            }
            const slotToAdd = new Slot({
                user_id,
                doctor_id,
                slot
            })
            await slotToAdd.save()
            return res.status(200).json(slotToAdd)
        } catch (e) {
            return res.status(405).json({message: 'SLOT IS NOT CREATED!!!'})
        }
    }
)

router.get('/getSlots',
    async (req, res) => {
        try {
            const slots = await Slot.find({}).populate("doctor_id").populate("user_id")
            return res.status(200).json(slots)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

router.post('/deleteSlots',
    async (req, res) => {
        const {doctor_id} = req.body
        console.log(doctor_id)
        try {
            const slots = await Slot.deleteMany({doctor_id: doctor_id})
            return res.status(200).json(slots)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

export default router