import * as fastJson from 'fast-json-stringify';
import { string } from 'joi';

export const stringifyUserInfo = fastJson({
  title: 'stringify Test',
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    age: {
      type: 'integer',
    },
    phoneNumber: {
      type: 'string',
    },
  },
});
