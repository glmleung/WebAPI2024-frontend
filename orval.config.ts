export default {
  dog: {
    input: "./schema.yaml",
    output: {
      mode: "tags-split",
      target: "src/api/generate.ts",
      schemas: "src/api/model",
      client: "react-query",
    },
  },
};
