import { checkSchema } from 'express-validator';

export default checkSchema(
  {
    currentPage: {
      customSanitizer: {
        options: (value) => {
          const number = Number(value);
          return Number.isInteger(number) ? number : 1;
        },
      },
    },
    perPage: {
      customSanitizer: {
        options: (value) => {
          const number = Number(value);
          return Number.isInteger(number) ? number : 4;
        },
      },
    },
  },
  ['query'],
);
