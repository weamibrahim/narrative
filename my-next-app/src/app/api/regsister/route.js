import connectMongo from "../../../libs/mongodb";
import users from "../../../models/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password,address,phone,role } = await req.json();
  console.log(name, email, password,address,phone);
  await connectMongo();
  const user = await users.findOne({ email });

  if (user) {
    return NextResponse.json({ errors: { email: "Email already exists" } }, { status: 422 });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await users.create({ name, email, password: hashedPassword ,address,phone,role});
  console.log(newUser);

  return NextResponse.json({ newUser, status: 200 });
}
