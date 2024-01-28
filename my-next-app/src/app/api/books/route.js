import connectMongo from "../../../libs/mongodb";
import books from "../../../models/books";
import { getToken, isValidToken } from "../../../middleware/authToken";
import { NextResponse } from "next/server";
import authorize from "../../../middleware/authorization";

export async function GET(req) {
  await connectMongo();
  const allbooks = await books.find();
  return NextResponse.json(allbooks);
}

export async function POST(req) {
  const token = await getToken(req);
  console.log("token", token);

  const decodedToken = isValidToken(token);

  if (!decodedToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  req.user = { role: decodedToken.role };
  try {
    // Apply authorization for the POST route (assuming 'admin' role is required)
   
      try {
        const { author, name, body } = await req.json();
        await connectMongo();
        const newbook = await books.create({ author, name, body });
        return NextResponse.json({ newbook, status: 200, message: "book created" });
      } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
   
  } catch (error) {
    console.error('Authorization error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(req) {
  const token = await getToken(req);

  const decodedToken = isValidToken(token);

  console.log("decodedToken", decodedToken.role);
  if (!decodedToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Apply authorization for the DELETE route (assuming 'admin' role is required)
    
      const id = req.nextUrl.searchParams.get("id");
      await connectMongo();
      const deletebook = await books.findByIdAndDelete(id);
      return NextResponse.json({ status: 200, message: "book deleted" });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
