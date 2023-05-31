const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/users');

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
