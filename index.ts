import * as fs from "fs";

const INPUT_FILE = "./input.tables.ts";
const OUTPUT_INSERT_SQL_FILE = "./insert.sql";
const OUTPUT_DELETE_SQL_FILE = "./delete.sql";

type SqlValue = string | number | null;
type Fixture = {
  [tableName: string]: Array<Record<string, SqlValue>>;
};

(async () => {
  const { fixture } = await import(INPUT_FILE);
  const insertSqlString = insertSql(fixture as Fixture);
  console.log(insertSqlString);
  outputSql(insertSqlString, OUTPUT_INSERT_SQL_FILE);

  const deleteSqlString = deleteSql(fixture as Fixture);
  console.log(deleteSqlString);
  outputSql(deleteSqlString, OUTPUT_DELETE_SQL_FILE);
})();

function insertSql(fixture: Fixture): string {
  const sqls = Object.keys(fixture).map((tableName) => {
    const recordList = fixture[tableName];
    const columns = Object.keys(recordList[0]);
    const valuesList = recordList.map((record) => {
      const values = Object.values(record).map((v) => {
        return convert(v);
      });
      return `( ${values.join(", ")} )`;
    });
    const sql = `INSERT INTO ${tableName} ( ${columns.join(", ")} )
  VALUES
    ${valuesList.join(",\n    ")}
;`;
    return sql;
  });
  return sqls.join("\n");
}

function deleteSql(fixture: Fixture): string {
  const sqls = Object.keys(fixture).map((tableName) => {
    const ids = fixture[tableName]
      .map((record) => {
        const { id } = record;
        if (typeof id === "string") {
          return `"${id}"`;
        } else if (id === null) {
          throw new Error("id cannot be null");
        }
        return id;
      })
      .join(", ");
    return `DELETE FROM ${tableName} WHERE id in (${ids});`;
  });
  return sqls.reverse().join("\n");
}

function convert(value: SqlValue): string | number {
  if (typeof value === "string") {
    return `"${value}"`;
  } else if (value === null) {
    return "null";
  }
  return value;
}

function outputSql(sql: string, filePath: string): void {
  fs.writeFileSync(filePath, sql, "utf-8");
}
