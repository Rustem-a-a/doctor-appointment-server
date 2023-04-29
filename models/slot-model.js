import {Schema,model} from "mongoose";

const Slot = new Schema({
    user_id:{type:String,required:true},
    doctor_id:{type:String,required:true},
    slots:{type:Number,required:true}
})

export default model('Slot',Slot)