import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/lit-draggable.ts",
    output: {
      file: "dist/lit-draggable.js",
      format: "es",
    },
    plugins: [
      typescript(),
      nodeResolve({
        extensions: [".js", ".ts"],
        preferBuiltins: false,
        browser: true,
      }),
      terser(),
    ],
  },
  {
    input: "src/lit-draggable-wrapper.ts",
    output: {
      file: "dist/lit-draggable-wrapper.js",
      format: "es",
    },
    plugins: [
      typescript(),
      nodeResolve({
        extensions: [".js", ".ts"],
        preferBuiltins: false,
        browser: true,
      }),
      terser(),
    ],
  },
];
