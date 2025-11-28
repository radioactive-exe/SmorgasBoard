/** @type {import("vite").UserConfig} */

import autoprefixer from "autoprefixer";
import { build } from "vite";

export default {
    publicDir: "./public",
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `app.js`,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith(".css"))
                        return `styles/app.[ext]`;
                    else return `assets/app.[ext]`;
                },
            },
        },
    },
};
