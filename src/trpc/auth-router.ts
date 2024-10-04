import { publicProcedure, router } from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// Define the main authRouter which contains different authentication routes (user creation, email verification, and sign-in).
export const authRouter = router({
  // User creation procedure: creates a new user in the 'users' collection.
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator) // Input validation for email and password.
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient() // Get the Payload CMS client instance.

      // Check if a user with the given email already exists in the 'users' collection.
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      // If a user already exists, throw an error indicating conflict (user already registered).
      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      // Create a new user with the provided email and password, and assign them the role 'user'.
      await payload.create({
        collection: 'users',
        data: { email, password, role: 'user' },
      })

      // Return a success message along with the email used for registration.
      return { success: true, sentToEmail: email }
    }),

  // Email verification procedure: verifies a user's email using a token.
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() })) // Input validation for the email verification token.
    .query(async ({ input }) => {
      const { token } = input
      const payload = await getPayloadClient() // Get the Payload CMS client instance.

      // Verify the email using the provided token in the 'users' collection.
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      // If the verification fails, throw an unauthorized error.
      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' })

      // Return a success message if the email is successfully verified.
      return { success: true }
    }),

  // User sign-in procedure: logs a user into the system using their email and password.
  signIn: publicProcedure
    .input(AuthCredentialsValidator) // Input validation for email and password.
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const payload = await getPayloadClient() // Get the Payload CMS client instance.
      const { res } = ctx // Get the response object from the context.

      try {
        // Attempt to log the user in by sending their credentials to the Payload CMS system.
        await payload.login({
          collection: 'users',
          data: { email, password },
          res,
        })

        // If successful, return a success message.
        return { success: true }
      } catch (err) {
        // If login fails, throw an unauthorized error.
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
