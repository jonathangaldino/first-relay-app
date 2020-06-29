import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// const User = require('../modules/user/UserModel');

/**
 * takes a user object and creates jwt out of it
 * using user.username
 * @param {Object} user the user to create a jwt for
 */
const createToken = ({ email, _id }) =>
  jwt.sign({ email, _id }, process.env.JWT_SECRET);

/**
 * Takes the token and decode it
 * @param {String} token
 * @returns User if token is valid
 */
const getUserFromToken = async token => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // return User.findOne({ id: user.id });
  } catch (err) {
    return null;
  }
};

/**
 *
 * @param {string} password unhashed of the user
 * @returns {string} hashed password
 */
const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/**
 *
 * @param {string} password
 * @param {string} hash
 * @returns boolean
 */
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { createToken, getUserFromToken, hashPassword, comparePassword };
