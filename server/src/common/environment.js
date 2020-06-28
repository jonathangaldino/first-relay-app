const variables = ['JWT_SECRET', 'MONGO_URL'];

variables.forEach(variable => {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
});

export default {
  JWT_SECRET: process.env.JWT_SECRET,
};
