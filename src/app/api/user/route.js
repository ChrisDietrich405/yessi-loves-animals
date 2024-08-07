import dbConnect from "../../config/db";
import { NextResponse } from "next/server";
import UsersModel from "@/app/models/users";
import emailValidator from "../../shared/emailValidator";
import bcrypt from "bcryptjs";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";

const isPasswordValid = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// const isEmailValid = (email) => {
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   return emailRegex.test(email);
// };

export async function POST(req) {
  const { name, streetAddress, city, state, zipCode, email, password } =
    await req.json();

  if (
    !name ||
    !streetAddress ||
    !city ||
    !state ||
    !zipCode ||
    !email ||
    !password
  ) {
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

  if (!isPasswordValid(password)) {
    return NextResponse.json(
      {
        status: 400,
        message: "Password not strong enough",
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
    await dbConnect();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UsersModel({
      name,
      streetAddress,
      city,
      state,
      zipCode,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ status: 201, message: "User created" });
  } catch (error) {
    return handleMongoError();
  }
}

export async function PUT(req) {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");
  const user = await UsersModel.findOne({ _id: userId });

  const userBody = await req.json();

  try {
    const updatedUser = await UsersModel.findOneAndUpdate(
      { _id: userId },
      { $set: userBody },
      { new: true, useFindAndModify: false } // 'new' returns the modified document
    );
    console.log("body ", updatedUser);

    return NextResponse.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    return handleMongoError();
  }
}
