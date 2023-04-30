import {Schema, model} from "mongoose";

const Doctor = new Schema({
    name: {type: String, required: true},
    spec: {type: String, required: true},
    slots: [{
        date_time: {
            start: {type: Date}, end: {type: Date}
        }, free: {type: Boolean, required: true}
    }]
})

export default model('Doctor', Doctor)
