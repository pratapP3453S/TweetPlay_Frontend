import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": "https://tweetplay-b.onrender.com",
        },
    },
    plugins: [react()],
});
// "/api": "http://localhost:8000",