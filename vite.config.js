import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@crown': path.resolve(__dirname, './crown'),
            '@core': path.resolve(__dirname, './crown/core'),
            '@utils': path.resolve(__dirname, './crown/utils'),
            '@core-gl': path.resolve(__dirname, './crown/core/gl'),
        },
    },
})