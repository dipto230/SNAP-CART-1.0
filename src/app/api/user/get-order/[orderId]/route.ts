import connectDb from "@/lib/db"
import Order from "@/models/order.model"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await connectDb()

    // ✅ FIX: await params
    const { orderId } = await params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { message: "Invalid order id" },
        { status: 400 }
      )
    }

    const order = await Order.findById(
      new mongoose.Types.ObjectId(orderId)
    ).populate("assignedDeliveryBoy")

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    console.error("GET ORDER ERROR:", error)
    return NextResponse.json(
      { message: "Get order by id error" },
      { status: 500 }
    )
  }
}
