import mongoose from 'mongoose';

const createDatabase = () => {
  const connect = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: 'relay',
    });
  };

  const disconnect = async () => {
    await mongoose.disconnect();
  };

  return { connect, disconnect };
};

mongoose.connection
  .on('open', () => console.log('[DATABASE] :: Connection opened'))
  .on('error', error => {
    console.log(error);
    throw new Error('[DATABASE] :: Failed to connect to mongodb instance');
  })
  .on('close', () => console.log('[DATABASE] :: Connection closed'))
  .on('connected', () => console.log('[DATABASE] :: connected'))
  .on('disconnected', () => console.log('[DATABASE] :: disconnected'));

export { createDatabase }
