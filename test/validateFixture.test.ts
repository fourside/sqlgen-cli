import test from "ava";
import { Fixture } from "../src";
import { validateFixture } from "../src/validateFixture";

test("return true", (t) => {
  // arrange
  const fixture = { tableName: [{ id: 1 }] };
  // act
  const result = validateFixture(fixture);
  // assert
  t.is(result, true);
});

test("empty fixture throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {};
      // act
      validateFixture(fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "no table names");
});

test("record not array throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: 1,
      };
      // act
      validateFixture((fixture as unknown) as Fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "set Array in tableName");
});

test("empty record throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: [],
      };
      // act
      validateFixture(fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "no records in tableName");
});

test("not object array in record throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: [1, 2, 3],
      };
      // act
      validateFixture((fixture as unknown) as Fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "record at 0 in tableName is not in object shape");
});

test("empty object of record throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: [{}],
      };
      // act
      validateFixture(fixture as Fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "record at 0 in tableName is empty");
});

test("records that has different column size throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: [
          { id: 1, name: "foo", age: 25 },
          { id: 2, name: "bar" },
        ],
      };
      // act
      validateFixture(fixture as Fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "columns of record at 1 in tableName is different from the first one");
});

test("records that has different column name throws error", (t) => {
  const error = t.throws(
    () => {
      // arrange
      const fixture = {
        tableName: [
          { id: 1, name: "foo", age: 25 },
          { id: 2, name: "bar", family: 4 },
        ],
      };
      // act
      validateFixture((fixture as unknown) as Fixture);
    },
    { instanceOf: Error }
  );
  t.is(error.message, "a column of record at 1 in tableName is different: expected is age, actual is family");
});
