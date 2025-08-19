// src/data/mocks/users.js
export const users = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    role: "parent",
    createdAt: "2023-01-15",
    children: [101, 102],
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    email: "marie@example.com",
    role: "child",
    createdAt: "2023-02-20",
    parentId: 1,
  },
];
