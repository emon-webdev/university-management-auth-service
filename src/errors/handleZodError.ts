import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;

// import mongoose from 'mongoose'
// import { IGenericErrorMessage } from '../interfaces/error'
// import { ZodError } from 'zod';

// export const handleValidationError = (err: mongoose.Error.ValidationError) => {
//   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
//     (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return {
//         path: el?.path,
//         message: el?.message,
//       }
//     }
//   )
//   const statusCode = 400
//   return {
//     statusCode,
//     message: 'Validation Error',
//     errorMessage: errors,
//   }
// }
// export default handleValidationError
