// In-memory storage for the POS system
const orders = [];
const payments = [];
const tables = [
  {
    id: "table-1",
    tableNo: 1,
    seats: 4,
    status: "Available",
    currentOrder: null
  },
  {
    id: "table-2", 
    tableNo: 2,
    seats: 2,
    status: "Available",
    currentOrder: null
  },
  {
    id: "table-3",
    tableNo: 3,
    seats: 6,
    status: "Available", 
    currentOrder: null
  },
  {
    id: "table-4",
    tableNo: 4,
    seats: 4,
    status: "Available",
    currentOrder: null
  },
  {
    id: "table-5",
    tableNo: 5,
    seats: 8,
    status: "Available",
    currentOrder: null
  }
];

module.exports = {
  orders,
  payments,
  tables
};
