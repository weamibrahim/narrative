import connectMongo from "../../../libs/mongodb";
import books from "../../../models/books";
import {getToken,isValidToken} from "../../../middleware/authToken"
import authorize from "../../../middleware/authorization"
import { NextResponse } from "next/server";
 export async function GET(req){
   
    await connectMongo();
    const allbooks = await books.find();
  
    return NextResponse.json(allbooks)
    console.log(allbooks)

 }


 export async function POST(req){
//console.log("Received token:", await getToken(req));
   const token = await getToken(req);
   console.log("token", token);

  

   const decodedToken = isValidToken(token);

   if (!decodedToken) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
 
   
  if (!authorize(decodedToken.role)){
    return NextResponse.json({ message: "Unauthorized for user" }, { status: 401 });
  }
    const {author,name,body}= await req.json();
    await connectMongo();

const newbook = await books.create({ author,name, body})
return NextResponse.json({newbook,status:200,message:"book created"})
     
 }








 export async function DELETE(req){
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
    const deletebook = await books.findByIdAndDelete(id)
    return NextResponse.json({status:200,message:"book deleted"})
 }

