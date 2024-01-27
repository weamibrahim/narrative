import connectMongo from "../../../../libs/mongodb";
import users from "../../../../models/users";
import { NextResponse } from "next/server";
import {getToken,isValidToken} from "../../../../middleware/authToken"
export async function PUT( req,{params}) {
    const token = await getToken(req);
   
 
    if (!isValidToken(token)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    const { name, email,address,phone } = await req.json();


    await connectMongo();
    const data = await users.findByIdAndUpdate(id, { name, email,address,phone });
    console.log(data);
    console.log(data);
    return NextResponse.json({ data }, { status: 200 });
}
