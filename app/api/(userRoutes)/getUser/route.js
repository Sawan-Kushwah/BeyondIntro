import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect";
import User from "../../models/User";

export async function GET(req) {
    try {
        await connectToDB();

        const searchParams = req.nextUrl.searchParams;

        const userId = searchParams.get('userid')

        const userData = User.findById({ userId });

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.log("Error in get user ", error);
        return NextResponse.json({ message: "Failed to get user", error: error.message }, { status: 500 });
    }
}