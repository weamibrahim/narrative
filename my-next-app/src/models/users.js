import mongoose ,{Schema} from "mongoose";
const usersSchema = new Schema({
    name: {
        type:String,
        required:true

        
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true,
        minlength: 6 
    },
    role:{
        type:String,
        default:'user',
        

    },
    address:String,
    phone:String


},{
        
        
    timestamps:true}

)

const users = mongoose.models.users || mongoose.model('users',usersSchema)
export default users