import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (email === "" || password === "") {
      throw new Error("Please fill all the fields");
    }
    //validation
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    } else {
      console.log("User exists");
    }

    //validation of password

    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);

    if (!validPassword) {
      console.log("invalid password");
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    // jsonwebtoken

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged In Success",
      success: true,
    });

    // cookies

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
