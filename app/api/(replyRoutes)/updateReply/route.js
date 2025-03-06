import { NextResponse } from "next/server";
import Reply from "../../models/Reply";
import connectToDB from "../../lib/dbConnect";

export async function PATCH(req) {
    try {
        await connectToDB()
        const id = req.nextUrl.searchParams.get('id');

        const data = await req.json();

        const reply = await Reply.findByIdAndUpdate(id, data);
        return NextResponse.json({ message: "Reply Updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in update Reply", error);
        return NextResponse.json({ message: "Failed to update reply", error: error.message }, { status: 500 });
    }
}