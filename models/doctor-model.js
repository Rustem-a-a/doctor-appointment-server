import {Schema,model} from "mongoose";
import {ObjectId} from "mongodb";

const Doctor = new Schema({
    name:{type:String,required:true},
    spec:{type:String,required:true},
    slots:[{date_time: {start: {type: Number}, end:{type: Number}
},free:{type:Boolean,required:true}}]
})

export default model('Doctor',Doctor)
