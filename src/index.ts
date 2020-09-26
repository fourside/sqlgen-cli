import * as fs from "fs";
import { Dayjs } from "dayjs";
import { validateFixture } from "./validateFixture";
import { insertSql, deleteSql } from "./generateSql";

const INPUT_FILE = "../input.tables.ts";
const OUTPUT_INSERT_SQL_FILE = "../insert.sql";
const OUTPUT_DELETE_SQL_FILE = "../delete.sql";

export type SqlValue = string | number | boolean | null | Dayjs;
export type Fixture = {
  [tableName: string]: Array<Record<string, SqlValue>>;
};

(async () => {
  const { fixture } = await import(INPUT_FILE);
  validateFixture(fixture);
  const insertSqlString = insertSql(fixture as Fixture);
  console.log(insertSqlString);
  outputSql(insertSqlString, OUTPUT_INSERT_SQL_FILE);

  const deleteSqlString = deleteSql(fixture as Fixture);
  console.log(deleteSqlString);
  outputSql(deleteSqlString, OUTPUT_DELETE_SQL_FILE);
})();

function outputSql(sql: string, filePath: string): void {
  fs.writeFileSync(filePath, sql, "utf-8");
}
