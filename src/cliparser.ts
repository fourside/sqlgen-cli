import yargs from "yargs";

export const argv = yargs
  .option("input-file", {
    alias: "f",
    description: "fixture typescript file that must export 'fixture'",
    default: "input.tables.ts",
  })
  .option("output-insert-sql", {
    alias: "i",
    description: "output file of bulk insert sql",
    default: "insert.sql",
  })
  .option("output-delete-sql", {
    alias: "d",
    description: "output file of delete sql",
    default: "delete.sql",
  })
  .help().argv;
