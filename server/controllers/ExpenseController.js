// server/controllers/expenseController.js
const Expense = require("../models/Expense");

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    // ✅ Change userId → user
    const expenses = await Expense.find({ user: req.user.id });
    if (expenses.length === 0) {
      return res.status(200).json({ message: "No expenses added yet." });
    }
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // ✅ Change userId → user
    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};