import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

// Public mutation called anonymously from the waitlist form.
// The client references it by string path: 'waitlist:submit'.
// Returns 'joined' | 'email-taken' | 'device-taken'.
export const submit = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    student: v.optional(v.boolean()),
    ip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const emailTaken = await ctx.db
      .query('waitlist')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
    if (emailTaken) return 'email-taken'
    // One signup per device/IP.
    if (args.ip) {
      const deviceTaken = await ctx.db
        .query('waitlist')
        .withIndex('by_ip', (q) => q.eq('ip', args.ip))
        .first()
      if (deviceTaken) return 'device-taken'
    }
    await ctx.db.insert('waitlist', {
      email: args.email,
      name: args.name,
      student: args.student,
      ip: args.ip,
      createdAt: Date.now(),
    })
    return 'joined'
  },
})

// Admin-only listing; unlocked by the ADMIN_KEY env var on the deployment
// (set with: npx convex env set ADMIN_KEY your-secret).
export const list = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const adminKey = process.env.ADMIN_KEY
    if (!adminKey || args.key !== adminKey) throw new Error('Unauthorized')
    return await ctx.db.query('waitlist').order('desc').collect()
  },
})
