// src/data/mocks/subscriptions.js
export const subscriptions = [
  {
    id: 1,
    userId: 101,
    plan: "monthly",
    price: 12,
    status: "active",
    startDate: "2023-01-15",
    endDate: "2023-02-15",
    paymentMethod: "card_visa",
  },
  {
    id: 2,
    userId: 102,
    plan: "yearly",
    price: 120,
    status: "active",
    startDate: "2023-03-01",
    endDate: "2024-03-01",
    paymentMethod: "card_mastercard",
  },
  {
    id: 3,
    userId: 103,
    plan: "monthly",
    price: 12,
    status: "canceled",
    startDate: "2023-04-10",
    endDate: "2023-05-10",
    paymentMethod: "card_visa",
  },
];
