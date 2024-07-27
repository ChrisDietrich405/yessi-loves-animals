import { NextResponse } from "next/server";
import CustomersModel from "../../models/customers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// function getTokenExpiration(token) {
//   const decoded = jwt.decode(token);
//   return typeof decoded === "object" && decoded !== null ? decoded.exp : null;
// }

export const POST = async (req) => {

  // try {
  const { email, password } = await req.json();
  console.log(email);

  // Check for missing email or password
  if (!email || !password) {
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
  try {
    // Find user in the database
    const existingAccount = await CustomersModel.findOne({ email });
    
    if (!existingAccount) {
      return NextResponse.json(
        { status: 401, message: "Incorrect credentials" },
        {
          status: 401,
        }
      );
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!matchedPassword) {
      return NextResponse.json(
        { status: 401, message: "Incorrect credentials" },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      { id: existingAccount._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
   

    //   // Get token expiration
    //   const expires = getTokenExpiration(token);

    return NextResponse.json({
      userId: existingAccount._id,
      token,
      status: 200,
      message: "User logged in",
    });
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};
