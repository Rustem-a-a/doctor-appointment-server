import {Schema, model, SchemaTypes} from "mongoose";

const Slot = new Schema({
    user_id: {type: SchemaTypes.ObjectId, ref: 'User'},
    doctor_id: {type: SchemaTypes.ObjectId, ref: 'Doctor'},
    slot: {type: Date, required: true}
})

export default model('Slot', Slot)