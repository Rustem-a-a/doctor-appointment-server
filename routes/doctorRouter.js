import {Router} from "express";
import Doctor from "../models/doctor-model.js";
const router = new Router()

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
            console.log(doctor_id)
            const doctor = await Doctor.findOne({_id: doctor_id})
            console.log(doctor)
            return res.status(200).json(doctor)

        } catch (e) {
            return res.status(405).json({message: 'DOCTOR IS NOT CREATED!!!'})
        }
    }
)


export default router