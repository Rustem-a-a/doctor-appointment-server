import {Router} from "express";
import Doctor from "../models/doctor-model.js";

const router = new Router()

router.post('/doctorAdd',
    async (req, res) => {
        try {
            console.log(234444444444)
            const {name, spec, slots} = req.body
            const doctorToAdd = new Doctor({
                name,
                spec,
                slots
            })
            await doctorToAdd.save()
            return res.status(200).json(doctorToAdd)

        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

router.get('/getDoctor/:doctor_id',
    async (req, res) => {
        try {
            const doctor_id = req.params.doctor_id
            const doctor = await Doctor.findOne({_id: doctor_id})
            return res.status(200).json(doctor)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

router.post('/addDoctorSlot',
    async (req, res) => {
        try {
            const {doctor_id, start, end, free} = req.body
            await Doctor.findByIdAndUpdate(
                doctor_id,
                {
                    $push: {
                        "slots": {
                            date_time: {
                                start: start,
                                end: end
                            },
                            free: free
                        }
                    }
                },
                {
                    arrayFilters: [],
                    new: true
                })
            const doctor = await Doctor.findById(doctor_id)
            return res.status(200).json(doctor)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

router.post('/updateDoctorSlot',
    async (req, res) => {
        try {
            const {doctor_id, slot_id, free} = req.body
            const doc = await Doctor.findById(doctor_id)
            if (doc.slots.filter(v => v._id == slot_id)[0].free === false) {
                return res.status(400).json({message: 'Time is busy'})
            }
            await Doctor.findByIdAndUpdate(
                doctor_id,
                {
                    $set: {
                        "slots.$[inner].free": free,
                    }
                },
                {
                    arrayFilters: [{"inner._id": slot_id}],
                    new: true
                })
            const doctor = await Doctor.findById(doctor_id)
            return res.status(200).json(doctor)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)
router.post('/refreshDoctorSlot',
    async (req, res) => {
        try {
            const {doctor_id} = req.body
            const free = true
            await Doctor.findByIdAndUpdate(
                doctor_id,
                {
                    $set: {
                        "slots.$[inner].free": free,
                    }
                },
                {
                    arrayFilters: [{"inner.free": false}],
                    new: true
                })
            const doctor = await Doctor.findById(doctor_id)
            return res.status(200).json(doctor)
        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)

export default router