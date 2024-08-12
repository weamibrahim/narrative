import connectMongo from "../../../libs/mongodb";
import users from "../../../models/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";
import { json } from "stream/consumers";
export async function POST(req) {
    
    const { email, password } = await req.json();
    //console.log(email, password);
    await connectMongo();
    const user = await users.findOne({ email });
    if (!user) {
        return NextResponse.json({ errors:{email:"Email not found"}},{ status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ errors:{password:"Wrong password"} } ,{ status: 401 });
    }
     const tokenData ={
        id:user._id,
        role:user.role}
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })
          console.log("token",token)

         
      const response =NextResponse.json({ user,status: 200 ,token })
    //   response.cookies.set("token", token);
    //   response.cookies.set("user",JSON.stringify(user));
            //    response.cookies.set("token", token, { httpOnly: true,path:"/",secure: true});

   console.log(response)
   return response
//return NextResponse.json({ user, token, status: 200 });

}
