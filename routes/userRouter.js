import {Router} from "express";
import User from "../models/user-model.js";

const router = new Router()

router.post('/userAdd',
    async (req, res) => {
        try {
            const {name, phone} = req.body
            const userToAdd = new User({
                name,
                phone
            })
            await userToAdd.save()
            return res.status(200).json(userToAdd)
        } catch (e) {
            return res.status(405).json({message: 'USER IS NOT CREATED!!!'})
        }
    }
)

router.get('/getUser/:user_id',
    async (req, res) => {
        try {
            const user_id = req.params.user_id
            console.log(user_id)
            const user = await User.findOne({_id: user_id})
            console.log(user)
            return res.status(200).json(user)

        } catch (e) {
            return res.status(405).json({message: 'USER IS NOT FOUND!!!'})
        }
    }
)

export default router