import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(reques: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "LogOut Successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
