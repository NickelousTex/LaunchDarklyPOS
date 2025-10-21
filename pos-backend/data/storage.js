// Simple in-memory storage for demo purposes
// In a real application, you would use a proper database

let orders = [];
let tables = [];
let payments = [];

// Initialize with some demo data
const initializeDemoData = () => {
  // Demo tables
  tables = [
    { id: "table-1", tableNo: 1, status: "Available", seats: 4, currentOrder: null },
    { id: "table-2", tableNo: 2, status: "Available", seats: 2, currentOrder: null },
    { id: "table-3", tableNo: 3, status: "Available", seats: 6, currentOrder: null },
    { id: "table-4", tableNo: 4, status: "Available", seats: 4, currentOrder: null },
    { id: "table-5", tableNo: 5, status: "Available", seats: 8, currentOrder: null },
  ];

  // Demo orders
  orders = [
    {
      id: "order-1",
      customerDetails: {
        name: "John Doe",
        phone: "1234567890",
        guests: 2
      },
      orderStatus: "Completed",
      orderDate: new Date(),
      bills: {
        total: 23.97,
        tax: 1.26,
        totalWithTax: 25.23
      },
      items: [
        { name: "Butter Chicken", price: 6.50, quantity: 1 },
        { name: "Naan Bread", price: 1.75, quantity: 2 }
      ],
      table: "table-1",
      paymentMethod: "Cash",
      paymentData: {}
    }
  ];
};

// Initialize demo data
initializeDemoData();

module.exports = {
  orders,
  tables,
  payments,
  initializeDemoData
};
