const INPUT_FILE = "./input.tables.ts";

type SqlValue = string | number | null;
type Fixture = {
  [tableName: string]: Array<Record<string, SqlValue>>;
};

(async () => {
  const { fixture } = await import(INPUT_FILE);
  const insertSqlString = insertSql(fixture as Fixture);
  console.log(insertSqlString);
  const deleteSqlString = deleteSql(fixture as Fixture);
  console.log(deleteSqlString);
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
    const sql = `
INSERT INTO ${tableName} ( ${columns.join(", ")} )
  VALUES ${valuesList.join(", ")};`;
    return sql;
  });
  return sqls.join();
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
