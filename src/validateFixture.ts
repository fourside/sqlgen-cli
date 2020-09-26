import { Fixture } from "./index";

export function validateFixture(fixture: Fixture): true {
  const tableNames = Object.keys(fixture);
  if (!tableNames || tableNames.length === 0) {
    throw new Error("no table names");
  }
  tableNames.forEach((tableName) => {
    const records = fixture[tableName];
    if (!Array.isArray(records)) {
      throw new Error(`set Array in ${tableName}`);
    }
    if (records.length === 0) {
      throw new Error(`no records in ${tableName}`);
    }
    const columns = Object.keys(records[0]).sort();
    records.forEach((record, index) => {
      if (typeof record !== "object") {
        throw new Error(`record at ${index} in ${tableName} is not in object shape`);
      }
      const recordColumns = Object.keys(record);
      if (recordColumns.length === 0) {
        throw new Error(`record at ${index} in ${tableName} is empty`);
      }
      if (columns.length !== recordColumns.length) {
        throw new Error(`columns of record at ${index} in ${tableName} is different from the first one`);
      }
      recordColumns.sort().forEach((column, columnIndex) => {
        if (columns[columnIndex] !== column) {
          throw new Error(
            `a column of record at ${index} in ${tableName} is different: expected is ${column}, actual is ${columns[columnIndex]}`
          );
        }
      });
    });
  });
  return true;
}
