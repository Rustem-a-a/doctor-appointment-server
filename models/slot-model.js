import {Schema,model} from "mongoose";

const Slot = new Schema({
    user_id:{type:String,required:true},
    doctor_id:{type:String,required:true},
    slots:{type:String,required:true}
})

export default model('Slot',Slot)