import * as dotenv from 'dotenv';

dotenv.config('../../.env');

const config = {
  MODO_BD: {
    memoria: "memoria",
    archivos: "archivos",
    mongodb: "mongodb",
    firebase:"firebase"
  },
  MONGO_DB: {
    uri: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hm73cnb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    usiSession:`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hm73cnb.mongodb.net/Sessiones?retryWrites=true&w=majority`
  },
  SECRET:"unsecreto",
  TWILIO:{ accountSid : process.env.TWILIO_ACCOUNT_SID,
    authToken : process.env.TWILIO_AUTH_TOKEN,
    phone:process.env.TWILIO_PHONE_NUMBER

  }
};


export default config;
