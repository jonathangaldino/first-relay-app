import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// const User = require('../modules/user/UserModel');

/**
 * takes a user object and creates jwt out of it
 * using user.username
 * @param {Object} user the user to create a jwt for
 */
const createToken = ({ username, id }) =>
  jwt.sign({ username, id }, process.env.JWT_SECRET);

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
const hashPassword = async password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

/**
 *
 * @param {string} password
 * @param {string} hash
 * @returns boolean
 */
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { createToken, getUserFromToken, hashPassword, comparePassword}
