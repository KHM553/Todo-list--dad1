# How to Deploy to Netlify

If you see a **White Screen** after deploying, it is 99% because you didn't add the Environment Variables.

## 1. Add Environment Variables
Go to **Netlify > Site Settings > Environment variables** and add:

| Key | Value (Copy from your .env.local) |
| :--- | :--- |
| `VITE_CONVEX_URL` | `https://...` |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_...` |

## 2. Build Settings
Ensure these are correct in Netlify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## 3. Redeploy
After adding the variables, you must go to **Deploys** and click **Trigger deploy** to apply the changes.
