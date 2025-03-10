import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // Adjust based on your user model
import { sendPasswordResetEmail } from "@/utils/mailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    await connectDB();

    // ✅ Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Email not found in our records" }), { status: 404 });
    }

    // ✅ Generate reset token (In real case, store this in DB with expiry)
    const resetToken = Math.random().toString(36).substr(2);

    // ✅ Send email
    await sendPasswordResetEmail(email, resetToken);

    return new Response(JSON.stringify({ message: "Reset link sent to your email" }), { status: 200 });

  } catch (error) {
    console.error("Error in API:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
