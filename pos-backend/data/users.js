// Predefined users for quick login - similar to Deloitte OpenNext approach
const predefinedUsers = [
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@pos.com",
    phone: "1234567890",
    role: "Admin",
    avatar: "👨‍💼",
    timezone: "America/New_York",
    timezoneDisplay: "NY"
  },
  {
    id: "waiter-001", 
    name: "John Waiter",
    email: "waiter@pos.com",
    phone: "1234567891",
    role: "Waiter",
    avatar: "👨‍🍳",
    timezone: "America/Los_Angeles",
    timezoneDisplay: "LA"
  },
  {
    id: "cashier-001",
    name: "Jane Cashier", 
    email: "cashier@pos.com",
    phone: "1234567892",
    role: "Cashier",
    avatar: "👩‍💼",
    timezone: "Asia/Singapore",
    timezoneDisplay: "SIN"
  }
];

module.exports = predefinedUsers;
