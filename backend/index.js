import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/user.js';
import loginRoutes from './api/login.js';
import chatRoutes from './api/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.use('/api/user', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/chat', chatRoutes);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}