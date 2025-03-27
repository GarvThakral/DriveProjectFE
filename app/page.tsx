// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import axios from "axios";
import jwt from 'jsonwebtoken'
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    const userId = session.user.id; // This should now work!
    const userEmail = session.user.email;
    console.log("User ID:", userId);
    console.log("User Email:", userEmail);
  } else {
    console.log("No session found");
  }
  console.log(process.env.NEXTAUTH_SECRET)
  const token = jwt.sign(session.user.id, process.env.NEXTAUTH_SECRET || "new");
  const userDeets = await axios.get('http://localhost:3002/user/me',{headers:{token}});
  console.log(userDeets)
  return (
    <div>
      <h1>Welcome</h1>
      {session ? (
        <p>Logged in as {JSON.stringify(session.accessToken)}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}