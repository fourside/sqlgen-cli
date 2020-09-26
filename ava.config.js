export default {
  files: ["test/*.ts"],
  typescript: {
    extensions: ["ts"],
    rewritePaths: {
      "src/": "build/",
    },
  },
  require: ["ts-node/register"],
};
