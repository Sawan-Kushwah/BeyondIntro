import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect"
import Post from "../../models/Post";

export async function POST(req) {
    try {
        await connectToDB();

        const data = await req.json();

        if (!data) {
            return NextResponse.json({ message: "Post data not found" });
        }

        const post = new Post(data);
        await post.save() // mongoddb method

        return NextResponse.json({ message: "Post saved successfully" });

    } catch (error) {
        console.error("Error in saving post", error)
        return NextResponse.json({ message: "Failed to post data", error: error.message }, { status: 500 });
    }
}