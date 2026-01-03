import { auth } from "@/auth";
import connectDb from "@/lib/db";
import DeliveryAssignment from "@/models/deliveryAssignment.model";
import "@/models/order.model"; // 🔥 FORCE REGISTER MODEL
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const deliveryBoyId = session.user.id;

    const activeAssignment = await DeliveryAssignment.findOne({
      assignedTo: deliveryBoyId,
      status: "assigned",
    })
      .populate("order") // SAFE NOW
      .lean();

    if (!activeAssignment) {
      return NextResponse.json(
        { active: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { active: true, assignment: activeAssignment },
      { status: 200 }
    );
  } catch (error) {
    console.error("CURRENT ORDER ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
