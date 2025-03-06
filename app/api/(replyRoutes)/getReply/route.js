import { NextResponse } from "next/server";
import connectToDB from "../../lib/dbConnect";

export async function GET(req) {
    try {
        await connectToDB();

        const searchParams = req.nextUrl.searchParams;
        const postID = searchParams.get('postID')

        // pagination logic
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 5;
        const skip = (page - 1) * limit;

        const replyQuery = Reply.find({ postID });

        const allReply = await replyQuery.sort(upVote).skip(skip).limit(limit);

        return NextResponse.json(allReply, { status: 200 });

    } catch (error) {
        console.log("Error in get all reply ", error);
        return NextResponse.json({ message: "Failed to get reply", error: error.message }, { status: 500 });
    }
}