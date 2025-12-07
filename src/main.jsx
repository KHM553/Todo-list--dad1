import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ConvexProvider } from "convex/react";
import { convex } from "./convexClient";

import { ClerkProvider } from "@clerk/clerk-react";

// نجيب مفتاح Clerk من env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key! تأكد إنك حطيته في ملف .env.local");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </ClerkProvider>
  </React.StrictMode>
);
