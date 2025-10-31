const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Error:', err));

// Test Route
app.get('/', (req, res) => {
    res.send('Personal Expense Tracker API is running...');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

//Confirming weather my backend is reading or not
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
