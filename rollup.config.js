import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

export default [
  {
    input: "src/lit-draggable.ts",
    output: {
      file: "dist/lit-draggable.js",
      format: "esm",
      sourcemap: "inline",
    },
    plugins: [
      typescript(),
      nodeResolve({
        extensions: [".js", ".ts"],
      }),
      terser({
        warnings: true,
        ecma: 2017,
        compress: {
          unsafe: true,
        },
        output: {
          comments: false,
        },
      }),
      filesize({
        showBrotliSize: true,
      }),
    ],
  },
  {
    input: "src/lit-draggable-wrapper.ts",
    output: {
      file: "dist/lit-draggable-wrapper.js",
      format: "esm",
    },
    plugins: [
      typescript(),
      nodeResolve({
        extensions: [".js", ".ts"],
      }),
      terser({
        warnings: true,
        ecma: 2017,
        compress: {
          unsafe: true,
        },
        output: {
          comments: false,
        },
      }),
      filesize({
        showBrotliSize: true,
      }),
    ],
  },
];
