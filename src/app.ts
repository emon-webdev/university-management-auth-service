import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
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

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

// test api
// const academicSemester = {
//   code: "01",
//   year: "2025"
// }

// const testId = async () => {
//   const testId = generateFacultyId()
//   console.log(testId)
// }
// testId()

export default app;
