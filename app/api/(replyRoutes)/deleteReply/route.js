import { NextResponse } from "next/server";
import Reply from "../../models/Reply";
import connectToDB from "../../lib/dbConnect";

export async function DELETE(req) {
    try {
        await connectToDB()

        const id = req.nextUrl.searchParams.get('id');

        const reply = await Reply.findByIdAndDelete(id);

        return NextResponse.json({ message: "Reply deleted successfully" }, { status: 200 });

    } catch (error) {
        console.log("Error in delete reply ", error);
        return NextResponse.json({ message: "Failed to delte reply", error: error.message }, { status: 500 });
    }
}