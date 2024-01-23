import mongoose ,{Schema} from "mongoose";
const usersSchema = new Schema({
    name: String,
    email: {
        type:String,
        unique:true
    },
    password: String,
    role:{
        type:String,
        default:'user'
    },
    address:String,
    phone:String,


},{
        
        
    timestamps:true}

)

const users = mongoose.models.users || mongoose.model('users',usersSchema)
export default users