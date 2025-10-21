const createHttpError = require("http-errors");
const { tables } = require("../data/storage");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    
    // Check if table number already exists
    const existingTable = tables.find(t => t.tableNo === tableNo);
    if (existingTable) {
      const error = createHttpError(400, "Table number already exists!");
      return next(error);
    }

    const newTable = {
      id: `table-${Date.now()}`,
      tableNo,
      seats,
      status: "Available",
      currentOrder: null
    };

    tables.push(newTable);

    res.status(201).json({
      success: true,
      message: "Table added successfully!",
      data: newTable
    });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: tables
    });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const { status, currentOrder } = req.body;

    const tableIndex = tables.findIndex(t => t.id === tableId);
    if (tableIndex === -1) {
      const error = createHttpError(404, "Table not found!");
      return next(error);
    }

    tables[tableIndex] = {
      ...tables[tableIndex],
      status: status || tables[tableIndex].status,
      currentOrder: currentOrder !== undefined ? currentOrder : tables[tableIndex].currentOrder
    };

    res.status(200).json({
      success: true,
      message: "Table updated successfully!",
      data: tables[tableIndex]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTable,
  getTables,
  updateTable
};