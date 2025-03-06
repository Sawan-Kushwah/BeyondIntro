import Post from "@/app/api/models/Post";
import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect";

export async function GET(req) {
    try {
        await connectToDB()
        const id = req.nextUrl.searchParams.get('id');

        const post = await Post.findById(id);
        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        console.log("Error in finding post by id", error);
        return NextResponse.json({ message: "Failed to get post by id", error: error.message }, { status: 500 });
    }
}