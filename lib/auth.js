import GoogleProvider from 'next-auth/providers/google'

// Use Prisma adapter locally if DATABASE_URL is set, otherwise use JWT
let adapter
if (process.env.DATABASE_URL) {
  try {
    const { PrismaAdapter } = require('@next-auth/prisma-adapter')
    const prisma = require('./prisma').default
    adapter = PrismaAdapter(prisma)
  } catch {
    // Prisma not available (e.g. Vercel without DB), fall back to JWT
  }
}

export const authOptions = {
  ...(adapter ? { adapter } : {}),
  session: {
    strategy: adapter ? 'database' : 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        // With JWT strategy, user info comes from token; with DB, from user
        session.user.id = user?.id ?? token?.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
