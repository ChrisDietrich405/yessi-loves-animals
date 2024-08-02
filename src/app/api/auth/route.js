import { NextResponse } from "next/server";
import CustomersModel from "../../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const POST = async (req) => {
  const { email, password } = await req.json();
  console.log(email);

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
      { userId: existingAccount._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    return NextResponse.json({
      userId: existingAccount._id,
      token,
      status: 200,
      isAdmin: existingAccount.isAdmin,
    });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};
