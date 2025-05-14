import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            address: true,
            postalCode: true,
            city: true,
            country: true,
            phone: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("Email ou mot de passe incorrect");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Email ou mot de passe incorrect");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          address: user.address,
          postalCode: user.postalCode,
          city: user.city,
          country: user.country,
          phone: user.phone,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.address = user.address;
        token.postalCode = user.postalCode;
        token.city = user.city;
        token.country = user.country;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string | null;
        session.user.address = token.address as string | null;
        session.user.postalCode = token.postalCode as string | null;
        session.user.city = token.city as string | null;
        session.user.country = token.country as string | null;
        session.user.phone = token.phone as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
