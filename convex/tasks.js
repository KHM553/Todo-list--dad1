import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks for a specific user
export const getTasks = query({
    args: { userId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.userId) {
            return [];
        }
        return await ctx.db
            .query("tasks")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .order("desc")
            .collect();
    },
});

// Add a new task
export const addTask = mutation({
    args: {
        title: v.string(),
        date: v.string(),
        description: v.optional(v.string()),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        if (!args.userId) {
            throw new Error("UserId is required to add a task");
        }
        await ctx.db.insert("tasks", {
            title: args.title,
            date: args.date,
            description: args.description || "",
            userId: args.userId,
            status: "pending",
            completed: false,
            createdAt: new Date().toISOString(),
        });
    },
});

// Toggle task completion status
export const toggleTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        const { id } = args;
        const task = await ctx.db.get(id);
        if (task) {
            await ctx.db.patch(id, { completed: !task.completed });
        }
    },
});

// Delete a task
export const deleteTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// Update a task title
export const updateTask = mutation({
    args: { id: v.id("tasks"), title: v.string() },
    handler: async (ctx, args) => {
        const { id, title } = args;
        const task = await ctx.db.get(id);
        if (task) {
            await ctx.db.patch(id, { title });
        }
    },
});
