const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const statsRoutes = require('./routes/stats');

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});