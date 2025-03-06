import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect"
import Reply from "../../models/Reply";

export async function POST(req) {
    try {
        await connectToDB();

        const data = await req.json(); // message , postID , createdBy 

        if (!data) {
            return NextResponse.json({ message: "Reply data not found" });
        }

        const reply = new Reply(data);
        await reply.save() // mongoddb method

        return NextResponse.json({ message: "Reply saved successfully" });

    } catch (error) {
        console.error("Error in saving post", error)
        return NextResponse.json({ message: "Failed to post data", error: error.message }, { status: 500 });
    }
}