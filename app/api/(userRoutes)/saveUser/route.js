import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect"
import User from "../../models/User";


export async function POST(req) {
    try {
        await connectToDB();

        const data = await req.json(); // username , email , id , avtar

        if (!data) {
            return NextResponse.json({ message: "user data not found" });
        }

        const user = new User(data);
        await user.save() // mongoddb method

        return NextResponse.json({ message: "user saved successfully" });

    } catch (error) {
        console.error("Error in saving user", error)
        return NextResponse.json({ message: "Failed to save user data", error: error.message }, { status: 500 });
    }
}