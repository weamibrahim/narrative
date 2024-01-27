import connectMongo from "../../../../libs/mongodb";
import books from "../../../../models/books";
import {getToken,isValidToken} from "../../../../middleware/authToken"
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const {id} = params;
   // console.log("id",params)
    await connectMongo();
    
    const data = await books.findOne({_id: id});
    return NextResponse.json({ data },{status: 200});
    }
export async function PUT(req,{params}) {
    const token = await getToken(req);

   if (!isValidToken(token)) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
    const {id} = params;
 
    const {author, name,body}= await req.json();
    console.log(author, name,body)
    await connectMongo();
    const data = await books.findByIdAndUpdate(id,{author,name,body},{ new: true });
   console.log(data)
    return NextResponse.json({ data },{status: 200});
    
}