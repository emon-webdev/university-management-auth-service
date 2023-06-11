import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { logger } from './shared/logger';

const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application   Routes
logger.info(app.get('env'));
logger.info(process.env);

app.use('/api/v1', router);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')
//   //   Promise.reject(new Error('Unhandled promise rejection'))
// })

//global error handler
app.use(globalErrorHandler);

export default app;
