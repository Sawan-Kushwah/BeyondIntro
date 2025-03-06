import { NextResponse } from "next/server";
import Post from "../../models/Post";

export async function PATCH(req) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const data = await req.json();
        console.log(id, data)

        const post = await Post.findByIdAndUpdate(id, data);
        return NextResponse.json({ message: "Post Updated successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error in finding post by id", error);
        return NextResponse.json({ message: "Failed to get post by id", error: error.message }, { status: 500 });
    }
}