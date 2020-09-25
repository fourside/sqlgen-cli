const defaultValues = { createdAt: "2020-01-01 00:00:00" };

export const fixture = {
  user: [
    { id: 11, name: "hoge", updated_at: null, ...defaultValues },
    { id: 12, name: "fuga", updated_at: null, ...defaultValues },
  ],
  tags: [
    { id: 1, name: "food" },
    { id: 2, name: "drink" },
  ],
};
