import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    user.isVerified = true;
    user.verifyTokenExpiry = undefined;
    user.verifyToken = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified successfully!", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
