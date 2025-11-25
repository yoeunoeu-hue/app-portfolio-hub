import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers"; // Added this line

export async function POST(request: Request) {
  const supabase = createClient(cookies()); // Modified this line
  const { name, email, message } = await request.json();

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: Implement email sending functionality here

  return NextResponse.json({ message: "Message sent successfully!" });
}
