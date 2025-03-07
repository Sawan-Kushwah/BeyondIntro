import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect";
import Post from "../../models/Post";

export async function GET(req) {
    try {
        console.log("mongodb uri ", process.env.MONGODB_URI)
        await connectToDB();

        const searchParams = req.nextUrl.searchParams;

        // pagination logic
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 5;
        const sort = searchParams.get('sort') || null;
        const skip = (page - 1) * limit;

        const postQuery = Post.find();

        if (sort) {
            console.log("sort", sort)
            postQuery.sort(sort)
        }

        const allPost = await postQuery.skip(skip).limit(limit);

        return NextResponse.json(allPost, { status: 200 });

    } catch (error) {
        console.log("Error in get all post ", error);
        return NextResponse.json({ message: "Failed to get post", error: error.message }, { status: 500 });
    }
}