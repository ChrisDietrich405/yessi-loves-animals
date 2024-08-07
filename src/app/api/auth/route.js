import dbConnect from "../../config/db";
import { NextResponse } from "next/server";
import emailValidator from "../../shared/emailValidator";
import CustomersModel from "../../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";

dotenv.config();

export const POST = async (req) => {
  const { email, password } = await req.json();

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

  if (!emailValidator(email)) {
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
    await dbConnect();
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
      { userId: existingAccount._id, isAdmin: existingAccount.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }, 
    );

    return NextResponse.json({
      userId: existingAccount._id,
      token,
      status: 200,
    });
  } catch (error) {
    return handleMongoError();
  }
};
