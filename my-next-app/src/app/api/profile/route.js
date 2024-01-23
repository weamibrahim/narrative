import connectMongo from "../../../libs/mongodb";
import users from "../../../models/users";
import { NextResponse } from "next/server";
import {getToken,isValidToken} from "../../../components/authToken"

export async function GET( req) {
    const token = await getToken(req);
   
 
    if (!isValidToken(token)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectMongo();

    const allusers = await users.find();
    
    return NextResponse.json( allusers );

}

export async function DELETE( req) {
  const token = await getToken(req);

   if (!isValidToken(token)) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
    const id= req.nextUrl.searchParams.get('id')
    await connectMongo();
    const deleteuser = await users.findByIdAndDelete(id)
    return NextResponse.json({status:200,message:"user deleted"})
}