import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    // exclude: [
    //   "**/node_modules/**",
    //   "**/cypress/**",
    //   "**/.{idea,git,cache,output,temp}/**",
    //   "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    // ],
  },
});
