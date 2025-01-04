import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  applicationToken: process.env.APPLICATION_TOKEN,
  baseURL: process.env.BASE_URL,
};
