# sqlgen-cli

generate sql string from `input.tables.ts`.

## usage
- `npm start`

```bash
$ npm start -- --help

Options:
      --version            Show version number                         [boolean]
  -f, --input-file         fixture typescript file that must export 'fixture'
                                                    [default: "input.tables.ts"]
  -i, --output-insert-sql  output file of bulk insert sql[default: "insert.sql"]
  -d, --output-delete-sql  output file of delete sql     [default: "delete.sql"]
      --help               Show help                                   [boolean]
```
