const createHttpError = require("http-errors");
const { payments } = require("../data/storage");

const createPayment = async (req, res, next) => {
  try {
    const newPayment = {
      id: `payment-${Date.now()}`,
      ...req.body,
      createdAt: new Date()
    };

    payments.push(newPayment);

    res.status(201).json({
      success: true,
      message: "Payment created successfully!",
      data: newPayment
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const payment = payments.find(p => p.id === paymentId);

    if (!payment) {
      const error = createHttpError(404, "Payment not found!");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments
};