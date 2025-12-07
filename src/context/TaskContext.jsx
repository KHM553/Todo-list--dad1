import { createContext, useContext, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from "@clerk/clerk-react";
import { api } from '../../convex/_generated/api';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const { user, isLoaded } = useUser();
    const userId = user?.id;

    // Sync user to Convex on login
    const syncUser = useMutation(api.users.syncUser);

    useEffect(() => {
        if (user) {
            syncUser({
                userId: user.id,
                name: user.fullName || user.firstName || "User",
                email: user.primaryEmailAddress?.emailAddress || "",
            });
        }
    }, [user, syncUser]);

    // Pass userId to query, or skip/pass empty if loading
    const tasksData = useQuery(api.tasks.getTasks, { userId: userId || "" }) || [];

    // Map Convex _id to id for compatibility with existing components
    const tasks = tasksData.map(task => ({
        ...task,
        id: task._id
    }));

    const addTaskMutation = useMutation(api.tasks.addTask);
    const toggleTaskMutation = useMutation(api.tasks.toggleTask);
    const deleteTaskMutation = useMutation(api.tasks.deleteTask);
    const updateTaskMutation = useMutation(api.tasks.updateTask);

    const addTask = async (title, date) => {
        if (!userId) return; // Prevent adding if not logged in
        await addTaskMutation({
            title,
            date,
            description: "",
            userId
        });
    };

    const toggleTask = async (id) => {
        await toggleTaskMutation({ id });
    };

    const deleteTask = async (id) => {
        await deleteTaskMutation({ id });
    };

    const updateTask = async (id, title) => {
        await updateTaskMutation({ id, title });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, updateTask, isLoaded, isSignedIn: !!user }}>
            {children}
        </TaskContext.Provider>
    );
};
