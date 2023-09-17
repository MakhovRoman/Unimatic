import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { dbConnect } from './db';
import cors from 'cors';
import router from './routes';
import { errorHandler } from './middleware/errorHandlingMiddleware';

const PORT = Number(process.env.PORT) | 5000;

const app = express();
app.use(cors())           // enable CORS
app.use(express.json())   // enable parsing JSON
app.use('/api', router);  // enable routing

// error processing
app.use(errorHandler)

try {
  dbConnect(); // Connect to database

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
} catch (error) {
  console.log(error)
}
