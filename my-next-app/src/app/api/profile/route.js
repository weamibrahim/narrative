import connectMongo from "../../../libs/mongodb";
import users from "../../../models/users";
import { NextResponse } from "next/server";
import {getToken,isValidToken} from "../../../middleware/authToken"
import authorize from "../../../middleware/authorization"

export async function GET( req) {
    const token = await getToken(req);
   
 
    const decodedToken = isValidToken(token);

    if (!decodedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    
   if (!authorize(decodedToken.role)){
     return NextResponse.json({ message: "Unauthorized for user" }, { status: 401 });
   }
    await connectMongo();

    const allusers = await users.find();
    
    return NextResponse.json( allusers );

}

export async function DELETE( req) {
  const token = await getToken(req);

  const decodedToken = isValidToken(token);

  if (!decodedToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  
 if (!authorize(decodedToken.role)){
   return NextResponse.json({ message: "Unauthorized for user" }, { status: 401 });
 }
    const id= req.nextUrl.searchParams.get('id')
    await connectMongo();
    const deleteuser = await users.findByIdAndDelete(id)
    return NextResponse.json({status:200,message:"user deleted"})
}