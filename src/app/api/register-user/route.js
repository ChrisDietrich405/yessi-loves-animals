import { NextResponse } from "next/server";
import UsersModel from "@/app/models/users";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, streetAddress, city, email, password } = await req.json();
  if (!name || !streetAddress || !city || !email || !password) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please add all necessary information",
      },
      {
        status: 400,
      }
    );
  }

  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email.match(emailFormat)) {
    return NextResponse.json(
      {
        status: 400,
        message: "Incorrect email format",
      },
      {
        status: 400,
      }
    );
  }

  const existingEmail = await UsersModel.findOne({ email });
  if (existingEmail) {
    return NextResponse.json(
      { status: 409, message: "Duplicate email" },
      {
        status: 409,
      }
    );
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const newUser = new UsersModel({
      name,
      streetAddress,
      city,
      email,
      password: hashedPassword,
    });
    console.log("user", newUser)

    await newUser.save();

    return NextResponse.json({ status: 201, message: "User created" });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: error.message },
      {
        status: 500,
      }
    );
  }
}


