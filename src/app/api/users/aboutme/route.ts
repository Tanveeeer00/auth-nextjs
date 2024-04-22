import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDB();

export async function GET(request: NextRequest) {
  // try {
  // exrtact data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  return NextResponse.json({ message: "User found", data: user });
  // } catch (error: any) {
  //     return NextResponse.json({ error: error.message }, { status: 500 });
  //   }
}
