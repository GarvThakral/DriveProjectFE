// ./api/auth/[...nextauth]/route.ts
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const userValid = await axios.post("http://localhost:3002/user/signin", {
          email,
          password,
        });
        if (userValid.status === 200) {
          console.log("User response:", userValid.data); // For debugging
          return {
            id: userValid.data.userLogin.id, // Fix: Get id from userLogin
            email: email,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        console.log("JWT token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; 
      console.log("Session:", session);
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };