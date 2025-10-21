const createHttpError = require("http-errors");
const { orders } = require("../data/storage");

const addOrder = async (req, res, next) => {
  try {
    const newOrder = {
      id: `order-${Date.now()}`,
      ...req.body,
      orderDate: new Date()
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: newOrder
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    orders[orderIndex].orderStatus = orderStatus;

    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      data: orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};