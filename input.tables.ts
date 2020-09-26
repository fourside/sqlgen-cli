import { today } from "./src/day";

const defaultValues = { createdAt: "2020-01-01 00:00:00" };
const yesterday = today.add(-1, "day").set("hour", 0).set("minute", 0).set("second", 0);

export const fixture = {
  user: [
    { id: 11, name: "hoge", updated_at: null, ...defaultValues },
    { id: 12, name: "fuga", updated_at: null, ...defaultValues },
  ],
  tags: [
    { id: 1, name: "food", added_at: today },
    { id: 2, name: "drink", added_at: yesterday },
  ],
};
