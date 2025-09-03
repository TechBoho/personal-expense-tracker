// controllers/expenseController.js
const Expense = require('../models/Expense');

// Add new expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense", error: err.message });
  }
};

// Get all expenses for user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};