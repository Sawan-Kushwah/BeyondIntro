import { NextResponse } from "next/server";
import Post from "../../models/Post";
import connectToDB from "../../lib/dbConnect";

export async function DELETE(req) {
    try {
        await connectToDB()
        const id = req.nextUrl.searchParams.get('id');
        console.log(id)
        const post = await Post.findByIdAndDelete(id);

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error in finding post by id", error);
        return NextResponse.json({ message: "Failed to get post by id", error: error.message }, { status: 500 });
    }
}