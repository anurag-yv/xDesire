import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return NextResponse.json(newProduct);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
