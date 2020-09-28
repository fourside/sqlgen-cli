import { isDayjs } from "dayjs";
import { DATE_FORMAT } from "./day";
import { Fixture, SqlValue } from "./index";

export function insertSql(fixture: Fixture): string {
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
  return withTransaction(sqls).join("\n");
}

export function deleteSql(fixture: Fixture): string {
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
  return withTransaction(sqls.reverse()).join("\n");
}

function convert(value: SqlValue): string | number | boolean {
  if (typeof value === "string") {
    return `"${value}"`;
  } else if (value === null) {
    return "null";
  } else if (isDayjs(value)) {
    return value.format(DATE_FORMAT);
  }
  return value;
}

function withTransaction(sqls: string[]): string[] {
  return ["BEGIN TRANSACTION;", ...sqls, "COMMIT;"];
}
