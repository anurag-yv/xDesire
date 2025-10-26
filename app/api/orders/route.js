import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userEmail, items, total } = await req.json();

    const newOrder = await Order.create({
      userEmail,
      items,
      total,
      status: "Pending",
    });

    return NextResponse.json(newOrder);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
