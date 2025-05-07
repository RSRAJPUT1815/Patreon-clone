import NextAuth from 'next-auth'

import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectdb';


export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDB()


        //chack if user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          const newUser = await User.create({

            email: user.email,
            username: user.email.split('@')[0],

          })

        }
        return true
      }
    },
    async session({ session, user, token }) {
     
      const dbuser = await User.findOne({ email: session.user.email })
      session.user.name = dbuser.username
      return session
    }
  }

})

export { authoptions as GET, authoptions as POST } 
