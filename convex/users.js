import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
    args: {
        userId: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first();

        if (!existing) {
            await ctx.db.insert("user", {
                userId: args.userId,
                name: args.name || "",
                email: args.email || "",
            });
        } else {
            await ctx.db.patch(existing._id, {
                name: args.name || existing.name,
                email: args.email || existing.email,
            });
        }
    },
});
