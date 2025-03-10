export async function POST(req) {
    const { token, password } = await req.json();
  
    if (!token || !password) {
      return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }
  
    // In a real app, verify the token and update the database
    return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
  }
  