import * as fs from "fs";
import * as path from "path";
import { Dayjs } from "dayjs";
import { validateFixture } from "./validateFixture";
import { insertSql, deleteSql } from "./generateSql";
import { argv } from "./cliparser";

const PROJECT_ROOT = "..";

const inputFile = path.resolve(__dirname, PROJECT_ROOT, argv["input-file"]);
const outputInsertSqlFile = path.resolve(__dirname, PROJECT_ROOT, argv["output-insert-sql"]);
const outputDeleteSqlFile = path.resolve(__dirname, PROJECT_ROOT, argv["output-delete-sql"]);

export type SqlValue = string | number | boolean | null | Dayjs;
export type Fixture = {
  [tableName: string]: Array<Record<string, SqlValue>>;
};

async function main(): Promise<void> {
  try {
    const { fixture } = await import(inputFile);
    validateFixture(fixture);
    const insertSqlString = insertSql(fixture as Fixture);
    console.log(insertSqlString);
    outputSql(insertSqlString, outputInsertSqlFile);

    const deleteSqlString = deleteSql(fixture as Fixture);
    console.log(deleteSqlString);
    outputSql(deleteSqlString, outputDeleteSqlFile);
  } catch (e) {
    console.log(e);
  }
}

function outputSql(sql: string, filePath: string): void {
  fs.writeFileSync(filePath, sql, "utf-8");
}

(async () => {
  await main();
})();
