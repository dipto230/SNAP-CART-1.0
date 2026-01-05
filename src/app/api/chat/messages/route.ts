import connectDb from "@/lib/db";
import ChatRoom from "@/models/chatRoom.model";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { roomId } = await req.json()
        let room = await ChatRoom.findById(roomId)
        if (!room) {
            return NextResponse.json(
                {message:`room are not found`},{status:400}
            )
        }
        const messages = await Message.find({roomId:room._id})
        return NextResponse.json(
            messages, {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {message:`create room  error ${error}`},{status:500}
        )
        
    }
}