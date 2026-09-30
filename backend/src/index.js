require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const seedDatabase = require('./seed');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Seed Demo Database on launch if empty
try {
  seedDatabase();
} catch (err) {
  console.warn('Database seed note:', err.message);
}

// Routes Registration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/officer', require('./routes/officerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/disbursements', require('./routes/disbursementRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'TrustLink AI Backend API',
    timestamp: new Date().toISOString(),
    groqConfigured: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.startsWith('gsk_'))
  });
});

// Serve frontend build if dist folder exists
const frontendDist = path.join(__dirname, '../../frontend/dist');
if (require('fs').existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.use((req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred. Please try again.'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 TrustLink AI Backend API active on port ${PORT}`);
  console.log(`🏛️ Ministry of Tribal Affairs (MoTA) ST Scholarship Portal`);
  console.log(`====================================================`);
});
