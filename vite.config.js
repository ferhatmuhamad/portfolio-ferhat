import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

// NOTE: Vite 7 default target = "baseline-widely-available" (Safari 16+, Chrome 107+).
// Banyak HP (iOS < 16, in-app browser FB/IG/Bing/WeChat, Android lawas) masih
// pakai engine lebih tua sehingga bundle gagal di-parse → halaman blank.
// Kita turunkan target supaya output di-transpile lebih konservatif.
const legacyTargets = ["es2019", "chrome87", "edge88", "firefox78", "safari14"];

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    build: {
        target: legacyTargets,
        cssTarget: legacyTargets,
    },
    esbuild: {
        target: "es2019",
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2019",
        },
    },
});
