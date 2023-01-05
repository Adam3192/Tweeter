import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import tweetRoutes from './routes/tweetRoutes';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

const connectionString: string = 'mongodb://localhost:27017/tweeter';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/tweeter', tweetRoutes);
app.use('/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
