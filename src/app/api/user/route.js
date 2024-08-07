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

export async function POST(req) {
  await dbConnect();
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

  const existingEmail = await UsersModel.findOne({ email: email });

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

    const newUser = new UsersModel({
      name,
      streetAddress,
      city,
      state,
      zipCode,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();

    return NextResponse.json({ status: 201, message: "User created" });
  } catch (error) {
    return handleMongoError();
  }
}

export async function PUT(req) {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  const userBody = await req.json();

  if (userBody.email) {
    return NextResponse.json(
      { status: 409, message: "Duplicate email" },
      {
        status: 409,
      }
    );
  }

  if (userBody.email && !emailValidator(email)) {
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
    const updatedUser = await UsersModel.findOneAndUpdate(
      { _id: userId },
      { $set: userBody },
      { new: true, useFindAndModify: false }
    );

    return NextResponse.json(updatedUser, {
      status: 200,
    });
  } catch (error) {
    return handleMongoError();
  }
}

export async function GET(req) {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  try {
    const customer = await UsersModel.findOne({ _id: userId });

    const custValue = customer._id.valueOf();

    if (userId !== custValue) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    return NextResponse.json({ status: 200, customer });
  } catch (error) {
    return handleMongoError();
  }
}
