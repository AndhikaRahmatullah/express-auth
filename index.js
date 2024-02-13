import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
import router from './routes/index.js';

const app = express();
dotenv.config();

try {
  await db.authenticate();
  console.log('Conneted...');
} catch (error) {
  console.error(error);
}

app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server start on port 5000.'));
