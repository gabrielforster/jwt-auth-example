import mongoose from "mongoose";
require('dotenv').config();

export const connect = () => {
  mongoose.connect(process.env.MONGO_URL as string);

  const db = mongoose.connection;
  db.on('error',(error) => console.error({'error on connection': error.message}));
  db.once('open',() => console.log('DB OK!'));
};
